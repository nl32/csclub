
import {prisma as prismaClient} from "../server/db"
import { createTRPCContext } from "../server/api/trpc";
import { User } from "next-auth";
import { TRPCError } from "@trpc/server";
type checkPermissionProps = {
    prisma: typeof prismaClient,
    id: string,
    permission:string
}

export const checkPermission = async ({prisma,id,permission}:checkPermissionProps) => {
   const result = await prisma.permission.findMany({where:{
        roles:{
            some:{
                Users:{
                    some:{
                        id:{
                            equals:id
                        }
                    }
                }
            }
        }
    }}); 
    if(result.findIndex((elem)=>elem.slug===permission)){
        return true
    }else{
        throw new TRPCError({code:"UNAUTHORIZED"})
    }

}
