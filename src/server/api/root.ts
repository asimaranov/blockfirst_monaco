import { postRouter } from '~/server/api/routers/post';
import { tinkoffRouter } from '~/server/api/routers/tinkoff';
import { notificationsRouter } from '~/server/api/routers/notifications';
import { userDataRouter } from '~/server/api/routers/userData';
import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';

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
