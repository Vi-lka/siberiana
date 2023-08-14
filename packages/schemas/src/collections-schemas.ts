import { z } from "zod";

//.........................CATEGORIES.........................//
export const CategoryNodeSchema = z.object({
    id: z.string(),
    displayName: z.string(),
    abbreviation: z.string().nullable(),
    description: z.string().nullable(),
    collections: z.object({
        id: z.string(),
    }).array().nullable().optional()
});
export type CategoryNodeType = z.infer<typeof CategoryNodeSchema>;

export const CategoriesSchema = z.object({
    totalCount: z.number(),
    edges: z.object({
        node: CategoryNodeSchema
    }).array()
});
export type CategoriesType = z.infer<typeof CategoriesSchema>;