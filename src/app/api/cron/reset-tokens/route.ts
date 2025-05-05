import { NextResponse } from 'next/server';
import UserDataModel from '~/server/models/userData';
import dbConnect from '~/server/mongodb';
import { TOKEN_LIMITS } from '~/server/api/services/ai';

/**
 * API route for resetting AI tokens for all users
 * This endpoint should be called by a Vercel Cron job daily at midnight
 */
export async function GET() {
  try {
    console.log('[CRON] Starting daily token reset for all users');

    await dbConnect();
    const today = new Date();

    // Find all users who need a token reset
    // (either no reset date or reset date different from today)
    const result = await UserDataModel.updateMany(
      {
        $or: [
          { 'aiTokens.lastResetDate': { $exists: false } },
          {
            $expr: {
              $or: [
                {
                  $ne: [
                    { $dayOfMonth: '$aiTokens.lastResetDate' },
                    today.getDate(),
                  ],
                },
                {
                  $ne: [
                    { $month: '$aiTokens.lastResetDate' },
                    today.getMonth() + 1,
                  ],
                },
                {
                  $ne: [
                    { $year: '$aiTokens.lastResetDate' },
                    today.getFullYear(),
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        $set: {
          'aiTokens.tokensUsedToday': 0,
          'aiTokens.lastResetDate': today,
        },
      }
    );

    console.log(`[CRON] Reset tokens for ${result.modifiedCount} users`);

    return NextResponse.json({
      success: true,
      message: `Reset tokens for ${result.modifiedCount} users`,
    });
  } catch (error) {
    console.error('[CRON] Error resetting tokens:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset tokens' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  return NextResponse.json({}, { headers: corsHeaders });
}
