import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"

export const itemOnRequstRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.itemsOnRequests.findMany();
    }),
  getByRequestId:
    publicProcedure.input(z.object({requestId: z.number()})).query(async ({ input: {requestId}, ctx }) => {
      return await ctx.prisma.itemsOnRequests.findMany({
        where: {
          requestId
        },
      });
    }),
})