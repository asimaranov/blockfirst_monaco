import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { createHash } from 'crypto';

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
