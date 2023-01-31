import { z } from "zod";

export const createProblemSchema =  z.object({
            name: z.nullable(z.string()),
            content: z.string().min(1),
            code: z.nullable(z.string()),
            answers: z.array(
                z.object({
                    content: z.string(),
                    correct: z.boolean()
                })
            )

        })
