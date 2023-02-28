import { Prisma } from "@prisma/client";
import { z } from "zod";

type JsonObject = Prisma.JsonObject;

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
export type Json = Literal | { [key: string]: Json } | Json[];
export const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

export const createProblemSchema = z.object({
  name: z.nullable(z.string()),
  content: jsonSchema,
  code: jsonSchema.optional(),
  answers: z.array(
    z.object({
      content: jsonSchema,
      correct: z.boolean(),
    })
  ),
});
