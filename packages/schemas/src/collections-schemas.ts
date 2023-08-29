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
export const CollectionsEnum = z.enum([ "artifacts", "books", "protected_area_pictures" ])
export type CollectionEnumType = z.infer<typeof CollectionsEnum>

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

//.........................OBJECTS.........................//
export const ObjectsEnum = z.enum([ "Artifact", "Book", "ProtectedAreaPicture" ])
export type ObjectsEnumType = z.infer<typeof ObjectsEnum>

export const ObjectNodeSchema = z.object({
    __typename: ObjectsEnum,
    id: z.string(),
    displayName: z.string(),
    primaryImageURL: z.string(),
});
export type ObjectNodeType = z.infer<typeof ObjectNodeSchema>;

export const ObjectsArraySchema = z.object({
    totalCount: z.number(),
    edges: z.object({
        node: ObjectNodeSchema
    }).array()
});
export type ObjectsArrayType = z.infer<typeof ObjectsArraySchema>;

export const ObjectsSchema = z.object({
    artifacts: ObjectsArraySchema,
    books: ObjectsArraySchema,
    protectedAreaPictures: ObjectsArraySchema
});
export type ObjectsType = z.infer<typeof ObjectsSchema>;

//.........................FILTERS.........................//
export const FilterNodeSchema = z.object({
    id: z.string(),
    displayName: z.string(),
    artifacts: z.object({
        id: z.string(),
    }).array().optional()
});
export type FilterNodeType = z.infer<typeof FilterNodeSchema>;

export const FilterArraySchema = z.object({
    totalCount: z.number(),
    edges: z.object({
        node: FilterNodeSchema
    }).array()
});
export type FilterArrayType = z.infer<typeof FilterArraySchema>;