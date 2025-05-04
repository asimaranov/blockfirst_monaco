import { postRouter } from '~/server/api/routers/post';
import { tinkoffRouter } from '~/server/api/routers/tinkoff';
import { notificationsRouter } from '~/server/api/routers/notifications';
import { userDataRouter } from '~/server/api/routers/userData';
import { subscribersRouter } from '~/server/api/routers/subscribers';
import { formSubmissionsRouter } from '~/server/api/routers/formSubmissions';
import { referralsRouter } from '~/server/api/routers/referrals';
import { trc20Router } from '~/server/api/routers/trc20';
import { vacanciesRouter } from '~/server/api/routers/vacancies';
import { tasksRouter } from '~/server/api/routers/tasks';
import { aiRouter } from '~/server/api/routers/ai';
import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';
import { examAiRouter } from './routers/examAi';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  tinkoff: tinkoffRouter,
  notifications: notificationsRouter,
  userData: userDataRouter,
  subscribers: subscribersRouter,
  formSubmissions: formSubmissionsRouter,
  referrals: referralsRouter,
  trc20: trc20Router,
  vacancies: vacanciesRouter,
  tasks: tasksRouter,
  ai: aiRouter,
  examAi: examAiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
