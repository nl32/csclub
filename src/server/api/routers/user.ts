import { createTRPCRouter, protectedProcedure, publicProcedure,  } from "../trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";
import { checkPermission } from "../../../utils/permissions";
export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const id = input.userId;
      const prisma = ctx.prisma;
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!user) throw new TRPCError({ code: "NOT_FOUND" });
      return user;
    }),
  getCurrentUser: protectedProcedure.query(async ({ input, ctx }) => {
    const id = ctx.session.user.id;
    const prisma = ctx.prisma;
    checkPermission({prisma,id,permission:"user.getCurrentUser"})
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) throw new TRPCError({ code: "NOT_FOUND" });
    return user;
  }),
});
