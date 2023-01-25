import { z } from "zod";
import { createTRPCRouter, protectedProcedure,  } from "../trpc";

export const roleRouter = createTRPCRouter({
    assignToUser:protectedProcedure.input(z.object({
        role:z.string()
    })).mutation(async({ctx,input})=>{
        const prisma = ctx.prisma;
        const user = await prisma.user.update({
            where:{
                id:ctx.session.user.id
            },
            data:{
                role:{
                    connectOrCreate:{
                        where:{
                            slug:input.role
                        },
                        create:{
                            slug:input.role
                        }
                    }
                }
            }
        })
        return user;
    }),
    create:protectedProcedure.input(z.object({
        slug:z.string().min(3).max(10)
    })).mutation(async ({ctx,input}) => {
        return await ctx.prisma.role.create({data:{
            slug:input.slug
        }})
    }),
    getAll: protectedProcedure.query(async ({ctx})=>{
        return await ctx.prisma.role.findMany({include:{
            Users:true,
            permissions:true
        }})
    })
})
