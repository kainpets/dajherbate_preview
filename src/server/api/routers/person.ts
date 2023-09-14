import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"

export const personRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.person.findMany();
    }),
  create: protectedProcedure
    .input(z.object({ firstLastName: z.string(), note: z.string(), height: z.string(), size: z.string(), shoeSize: z.string(), waistSize: z.string(), }))
    .mutation(async ({ input: { firstLastName, note, height, size, shoeSize, waistSize }, ctx }) => {
      const person = await ctx.prisma.person.create({
        data: { firstLastName, note, authorId: ctx.session.user.id, height, size, shoeSize, waistSize, authorName: ctx.session.user.name }
      })
      return person;
    }),
  getById:
    publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input: { id }, ctx }) => {
        return await ctx.prisma.person.findFirst({
          where: {
            id
          },
        });
      }),
  deleteById:
    protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input: { id }, ctx }) => {
        return ctx.prisma.person.delete({
          where: {
            id
          },
        });
      }),
  modify: protectedProcedure
    .input(z.object({ id: z.string(), firstLastName: z.string(), note: z.string(), height: z.string(), size: z.string(), shoeSize: z.string(), waistSize: z.string(), }))
    .mutation(async ({ input: { firstLastName, note, height, size, shoeSize, waistSize, id }, ctx }) => {
      const modifiedPerson = await ctx.prisma.person.update({
        data: { firstLastName, note, height, size, shoeSize, waistSize, lastModifiedBy: ctx.session.user.name },
        where: {
          id
        },
      })
      return modifiedPerson;
    }),
})