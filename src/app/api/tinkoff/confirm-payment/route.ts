import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { createHash } from 'crypto';
import dbConnect from '~/server/mongodb';
import UserDataModel from '~/server/models/userData';
import { TARIFFS } from '~/app/lib/constants/tariff';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Get IP address from request
    const ip = request.headers.get('x-real-ip') || 'IP not available';

    console.log('Payment IP:', ip);
    console.log('Payment data', data);

    const password = process.env.TINKOFF_PASSWORD!;

    const dataForToken = {
      TerminalKey: data.TerminalKey,
      OrderId: data.OrderId,
      Success: data.Success,
      Status: data.Status,
      PaymentId: data.PaymentId,
      ErrorCode: data.ErrorCode,
      Amount: data.Amount,
      CardId: data.CardId,
      Pan: data.Pan,
      ExpDate: data.ExpDate,
      Password: password,
      ...(data.RebillId ? { RebillId: data.RebillId } : {}),
    };

    // sort data by keys
    const sorted_data = Object.keys(dataForToken)
      .sort()
      .reduce<Record<string, string | number>>((obj, key) => {
        obj[key] = dataForToken[key as keyof typeof dataForToken];
        return obj;
      }, {});

    // create signature
    const signature = Object.keys(sorted_data)
      .map((key) => `${sorted_data[key]}`)
      .join('');

    // In python it's like this: token = hashlib.sha256(token_string.encode('utf-8')).hexdigest()
    // so we need to do the same in javascript
    const token = createHash('sha256').update(signature).digest('hex');

    console.log('Check payment token:', token);
    console.log('Request token:', data.Token);
    console.log('Token match:', token === data.Token);

    // If payment is successful and token matches, update user tariff in MongoDB
    if (
      data.Success === 'true' &&
      token === data.Token &&
      data.Status === 'CONFIRMED'
    ) {
      await dbConnect();

      // Extract the user's email from the Receipt data
      const email = data.Receipt?.Email;

      if (!email) {
        console.error('No email found in payment data, cannot identify user');
        return new Response('ok', { status: 200 });
      }

      // Extract tariff info from OrderId
      // In tinkoff.ts, OrderId format is: email-tariffId-timestamp
      const orderIdParts = data.OrderId.split('-');
      // The tariff ID is the second element in the split array
      const tariffId = orderIdParts.length >= 2 ? orderIdParts[1] : '';
      console.log(`Extracted tariffId from OrderId: ${tariffId}`);
      let tariffPlan = tariffId;

      // Handle tariff upgrades (if tariff is pro-upgrade, it should be set as 'pro')
      if (tariffId === 'pro-upgrade') {
        tariffPlan = 'pro';
      }

      console.log(
        `Payment received for tariff: ${tariffId}, will set plan to: ${tariffPlan}`
      );

      // Find Auth.js user by email
      // Here we directly query the MongoDB users collection from authjs
      const authUser = await mongoose.connection.db
        ?.collection('users')
        .findOne({ email: email.toLowerCase() });

      if (!authUser || !authUser._id) {
        console.error('Could not find user with email:', email);
        return new Response('ok', { status: 200 });
      }

      const userId = authUser._id.toString();
      console.log(`Found user with ID: ${userId}`);

      // Calculate subscription end date (1 year from now)
      const premiumEndDate = new Date();
      premiumEndDate.setFullYear(premiumEndDate.getFullYear() + 1);

      // Update user data with new tariff and subscription dates
      const updateResult = await UserDataModel.findOneAndUpdate(
        { userId },
        {
          plan: tariffPlan,
          premiumStartDate: new Date(),
          premiumEndDate: premiumEndDate,
        },
        { upsert: true, new: true }
      );

      console.log('User tariff updated:', updateResult);

      // Revalidate cache for user data
      revalidateTag('userData');
    }

    // text response with string ok and status 200
    return new Response('ok', { status: 200 });
  } catch (error) {
    console.error('Error confirming payment:', error);
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}
