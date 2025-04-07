import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { api } from '~/trpc/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  try {
    // Validate the referral code
    const result = await api.referrals.validateReferralCode({
      code,
    });

    if (result.valid && result.referrerId) {
      // Store the referral code in a cookie that expires in 30 days
      (await cookies()).set({
        name: 'referral_code',
        value: code,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      // Store the referrer ID in a cookie
      (await cookies()).set({
        name: 'referrer_id',
        value: result.referrerId,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    // Redirect to the homepage with a 302 (Found) status
    return NextResponse.redirect(new URL('/', request.url), 302);
  } catch (error) {
    console.error('Error processing referral code:', error);
    // Redirect to the homepage even if there's an error
    return NextResponse.redirect(new URL('/', request.url), 302);
  }
}
