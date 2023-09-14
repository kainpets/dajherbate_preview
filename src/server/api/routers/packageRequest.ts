import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const packageRequestRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.packageRequest.findMany();
    }),
  getRequsetsForPerson: publicProcedure
    .input(z.object({ personId: z.string() }))
    .query(async ({ input: { personId }, ctx }) => {
      return await ctx.prisma.packageRequest.findMany({
        where: {
          personId
        },
        include: {
          items: {
            include: {
              item: true
            }
          }
        },
      });
    }),
})