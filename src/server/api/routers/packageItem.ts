import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"

export const packageItemRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.packageItem.findMany();
    }),
  getById: publicProcedure
    .input(z.object({id: z.number()}))
    .query(async({ input: {id}, ctx }) => {
      return await ctx.prisma.packageItem.findFirst({
        where: {
            id
        }
    });
  }),
})