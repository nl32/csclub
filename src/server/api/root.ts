import { authRouter } from "./routers/auth";
import { competitionsRouter } from "./routers/competitions";
import { roleRouter } from "./routers/role";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
    auth:authRouter,
    competitions: competitionsRouter,
    role: roleRouter,
    user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

