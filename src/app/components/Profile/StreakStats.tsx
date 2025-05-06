'use client';

import React, { useEffect } from 'react';
import { api } from '~/trpc/react';
import { authClient } from '~/server/auth/client';
import Image from 'next/image';
import FireIcon from '../LessonPage/assets/Fire.png';
import SparklesIcon from '../LessonPage/assets/Sparkles.png';
import { cn } from '~/helpers';

const StreakStats = () => {
  const { data: session } = authClient.useSession();

  // Use tRPC to get streak and XP data
  const { data: streakAndXp, isLoading } = api.userData.getStreakAndXp.useQuery(
    undefined,
    {
      enabled: !!session?.user,
      refetchOnWindowFocus: false,
    }
  );

  // Get leaderboard data
  const { data: leaderboard } = api.userData.getStreakLeaderboard.useQuery(
    { limit: 10 },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 5, // Refetch every 5 minutes
    }
  );

  // User rank in leaderboard
  const userRank = leaderboard?.findIndex(
    (entry) => entry.userId === session?.user?.id
  );

  return (
    <div className="border-foreground/10 bg-foreground/5 w-full rounded-xl border p-6">
      <h2 className="mb-4 text-xl font-semibold">Ваша статистика</h2>

      {!session?.user ? (
        <div className="text-secondary py-4 text-center">
          Войдите, чтобы увидеть вашу статистику
        </div>
      ) : isLoading ? (
        <div className="flex justify-center py-4">
          <div className="border-foreground/20 border-t-foreground h-6 w-6 animate-spin rounded-full border-2"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-foreground/10 flex items-center gap-3 rounded-lg p-4">
              <div className="bg-foreground/20 flex h-10 w-10 items-center justify-center rounded-full">
                <Image src={FireIcon} alt="Streak" className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold">
                  {streakAndXp?.streak.count || 0}
                </div>
                <div className="text-secondary text-sm">Текущий стрик</div>
              </div>
            </div>

            <div className="bg-foreground/10 flex items-center gap-3 rounded-lg p-4">
              <div className="bg-foreground/20 flex h-10 w-10 items-center justify-center rounded-full">
                <Image src={SparklesIcon} alt="XP" className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold">
                  {streakAndXp?.xp.total || 0}
                </div>
                <div className="text-secondary text-sm">Всего XP</div>
              </div>
            </div>
          </div>

          {/* Additional stats */}
          <div className="bg-foreground/10 space-y-2 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="text-secondary">Макс. стрик</span>
              <span>{streakAndXp?.streak.maxCount || 0} дней</span>
            </div>

            <div className="flex justify-between">
              <span className="text-secondary">Ваш ранг</span>
              <span>
                {userRank !== undefined && userRank >= 0
                  ? `#${userRank + 1}`
                  : 'Нет в рейтинге'}
              </span>
            </div>
          </div>

          {/* Leaderboard */}
          {leaderboard && leaderboard.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Лидерборд</h3>
              <div className="overflow-hidden rounded-lg">
                <table className="w-full">
                  <thead className="bg-foreground/10 text-left">
                    <tr>
                      <th className="p-3 text-sm font-medium">#</th>
                      <th className="p-3 text-sm font-medium">Пользователь</th>
                      <th className="p-3 text-sm font-medium">Стрик</th>
                      <th className="p-3 text-sm font-medium">XP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-foreground/10 divide-y">
                    {leaderboard.map((user, index) => (
                      <tr
                        key={user.userId}
                        className={cn(
                          'bg-foreground/5',
                          user.userId === session.user.id && 'bg-foreground/20'
                        )}
                      >
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3 font-medium">
                          {user.userId === session.user.id
                            ? 'Вы'
                            : `User ${user.userId.slice(0, 6)}...`}
                        </td>
                        <td className="p-3">{user.streak}</td>
                        <td className="p-3">{user.xp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StreakStats;
