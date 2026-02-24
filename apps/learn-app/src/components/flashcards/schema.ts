import { z } from "zod";

export const CardSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "Must be kebab-case"),
  front: z.string().min(10).max(300),
  back: z.string().min(10).max(500),
  tags: z.array(z.string()).min(1),
  difficulty: z.enum(["basic", "intermediate", "advanced"]),
  why: z.string().max(200).optional(),
});

export const DeckSchema = z.object({
  deck: z.object({
    id: z.string().regex(/^[a-z0-9-]+$/, "Must be kebab-case"),
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(300),
    tags: z.array(z.string()).min(1),
    version: z.number().int().positive(),
  }),
  cards: z.array(CardSchema).min(5).max(30),
});

export type DeckSchemaType = z.infer<typeof DeckSchema>;
