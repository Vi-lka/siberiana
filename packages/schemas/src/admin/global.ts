import { z } from "zod";
import { Location } from "../objects-schema"
import { CollectionTypeEnum } from "../collections-schemas";

//.........................LOCATIONS.........................//
export const LocationsList = z.object({
    locations: z.object({
        edges: z.object({
            node: Location
        }).array()
    })
})
export type LocationsList = z.infer<typeof LocationsList>;

//.........................CATEGORIES.........................//
export const CategoriesList = z.object({
    categories: z.object({
        edges: z.object({
            node: z.object({
                id: z.string(),
                displayName: z.string(),
                slug: z.string(),
            })
        }).array()
    })
})
export type CategoriesList = z.infer<typeof CategoriesList>;

//.........................COLLECTIONS.........................//
export const CollectionsList = z.object({
    collections: z.object({
        edges: z.object({
            node: z.object({
                id: z.string(),
                displayName: z.string(),
                slug: z.string(),
                type: CollectionTypeEnum,
            })
        }).array()
    })
})
export type CollectionsList = z.infer<typeof CollectionsList>;