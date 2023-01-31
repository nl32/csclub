import { z } from "zod";
import { createProblemSchema } from "../../../utils/schemas";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const problemRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            createProblemSchema
        )
        .mutation(async ({ input, ctx }) => {
            const prisma = ctx.prisma;
            const newProblem = await prisma.mCProblem.create({
                data: {
                    name: input.name,
                    content: input.content,
                    author: { connect: { id: ctx.session.user.id } },
                    answers: {
                        createMany: {
                            data: input.answers
                        }
                    },
                    code: input.code
                }
            })
            return newProblem
        }),
    get: protectedProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input, ctx }) => {
            const prisma = ctx.prisma;
            return await prisma.mCProblem.findUnique({
                where: {
                    id: input.id
                },
                include: {
                    answers: true,
                }
            })
        }),
    getInfinite: protectedProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.number().nullish()
            }))
        .query(async ({ input, ctx }) => {
            const limit = input.limit ?? 50;
            const { cursor } = input;
            const problems = await ctx.prisma.mCProblem.findMany(
                {
                    take: limit + 1,
                    include: {
                        answers: true
                    },
                    cursor: cursor ? { id: cursor } : undefined,
                    orderBy: { id: "asc" }
                }
            )
            let nextCursor: typeof cursor | undefined = undefined;
            if (problems.length > limit) {
                const nextProblem = problems.pop()
                nextCursor = nextProblem!.id
            }
            return {
                problems: problems,
                nextCursor
            }
        })

})
