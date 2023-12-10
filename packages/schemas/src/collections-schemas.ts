import { z } from "zod";

export const CollectionTypeEnum = z.enum([
  "art",
  "artifacts",
  "books",
  "protected_area_pictures",
  "herbaria",
]);
export type CollectionTypeEnum = z.infer<typeof CollectionTypeEnum>;

//.........................CATEGORIES.........................//
export const CategoryNode = z.object({
  id: z.string(),
  slug: z.string().min(1).regex(new RegExp("^[a-z](-?[a-z])*$")),
  displayName: z.string().min(1),
  abbreviation: z.string(),
  primaryImageURL: z.string(),
  description: z.string(),
  collections: z
    .object({
      id: z.string(),
      displayName: z.string(),
    })
    .array(),
  createdBy: z.string().optional(),
  createdAt: z
    .preprocess((val) => new Date(val as string), z.date())
    .optional(),
  updatedBy: z.string().optional(),
  updatedAt: z
    .preprocess((val) => new Date(val as string), z.date())
    .optional(),
});
export type CategoryNode = z.infer<typeof CategoryNode>;

export const Categories = z.object({
  totalCount: z.number(),
  edges: z
    .object({
      node: CategoryNode,
    })
    .array(),
});
export type Categories = z.infer<typeof Categories>;

//.........................COLLECTIONS.........................//
export const CollectionsEnum = z.enum([
  "artifacts",
  "books",
  "protected_area_pictures",
]);
export type CollectionsEnum = z.infer<typeof CollectionsEnum>;

export const CollectionNode = z.object({
  id: z.string(),
  type: CollectionTypeEnum,
  slug: z.string().min(1).regex(new RegExp("^[a-z](-?[a-z])*$")),
  displayName: z.string().min(1),
  abbreviation: z.string(),
  primaryImageURL: z.string(),
  description: z.string(),
  category: z.object({
    id: z.string(),
    slug: z.string().optional(),
    displayName: z.string(),
  }),
  createdBy: z.string().optional(),
  createdAt: z
    .preprocess((val) => new Date(val as string), z.date())
    .optional(),
  updatedBy: z.string().optional(),
  updatedAt: z
    .preprocess((val) => new Date(val as string), z.date())
    .optional(),
});
export type CollectionNode = z.infer<typeof CollectionNode>;

export const Collections = z.object({
  totalCount: z.number(),
  edges: z
    .object({
      node: CollectionNode,
    })
    .array(),
});
export type Collections = z.infer<typeof Collections>;

//.........................OBJECTS.........................//
export const ObjectsEnum = z.enum([
  "Artifact",
  "Book",
  "ProtectedAreaPicture",
  "Art",
]);
export type ObjectsEnum = z.infer<typeof ObjectsEnum>;

export const ObjectNode = z.object({
  __typename: ObjectsEnum,
  id: z.string(),
  displayName: z.string(),
  primaryImageURL: z.string(),
});
export type ObjectNode = z.infer<typeof ObjectNode>;

export const ObjectsArray = z.object({
  totalCount: z.number(),
  edges: z
    .object({
      node: ObjectNode,
    })
    .array(),
});
export type ObjectsArray = z.infer<typeof ObjectsArray>;

export const Objects = z.object({
  artifacts: ObjectsArray,
  books: ObjectsArray,
  protectedAreaPictures: ObjectsArray,
});
export type Objects = z.infer<typeof Objects>;
