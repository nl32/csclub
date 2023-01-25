import { createTRPCRouter, publicProcedure,  } from "../trpc";
import z from "zod"

export const competitionsRouter = createTRPCRouter({
    getCompetitions: publicProcedure
    .query(async ({ctx}) => {
        const prisma = ctx.prisma;
        const competitions = await prisma.competition.findMany({
            select: {
                name:true,
                eventDate:true,
                compLink:true
            }
        })
        return competitions
    }),
    createCompetition: publicProcedure
    .input(
        z.object({
            name:z.string(),
            eventDate:z.string().datetime(),
            compLink:z.string().url()
        })
    )
    .mutation(async ({input,ctx}) => {
        const prisma = ctx.prisma;
        const result = await prisma.competition.create({
            data:{name:input.name,
            eventDate:input.eventDate,
            compLink:input.compLink
            }
        })
        return result
    })
})
