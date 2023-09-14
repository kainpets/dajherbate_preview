import { createTRPCRouter } from "~/server/api/trpc";
import { personRouter } from "./routers/person";
import { packageRequestRouter } from "./routers/packageRequest";
import { packageItemRouter } from "./routers/packageItem";
import { itemOnRequstRouter } from "./routers/itemOnRequest";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  person: personRouter,
  packageRequest: packageRequestRouter,
  packageItem: packageItemRouter,
  itemOnRequest: itemOnRequstRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
