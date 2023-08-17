import { z } from "zod";

//.........................CATEGORIES.........................//
export const CategoryNodeSchema = z.object({
    id: z.string(),
    slug: z.string(),
    displayName: z.string(),
    abbreviation: z.string(),
    primaryImageURL: z.string(),
    description: z.string(),
    collections: z.object({
        id: z.string(),
        slug: z.string(),
    }).array()
});
export type CategoryNodeType = z.infer<typeof CategoryNodeSchema>;

export const CategoriesSchema = z.object({
    totalCount: z.number(),
    edges: z.object({
        node: CategoryNodeSchema
    }).array()
});
export type CategoriesType = z.infer<typeof CategoriesSchema>;

//.........................COLLECTIONS.........................//
export const CollectionNodeSchema = z.object({
    id: z.string(),
    slug: z.string(),
    displayName: z.string(),
    abbreviation: z.string(),
    primaryImageURL: z.string(),
    description: z.string(),
    category : z.object({
        id: z.string(),
        slug: z.string()
    }).nullable()
});
export type CollectionNodeType = z.infer<typeof CollectionNodeSchema>;

export const CollectionsSchema = z.object({
    totalCount: z.number(),
    edges: z.object({
        node: CollectionNodeSchema
    }).array()
});
export type CollectionsType = z.infer<typeof CollectionsSchema>;