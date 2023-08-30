import { z } from "zod";

//.........................FILTERS ENUMS.........................//
export const FiltersEnum = z.enum([ 
    "Culture", 
    "Monument", 
    "Technique", 
    "Location", 
    "Country" 
])
export type FiltersEnum = z.infer<typeof FiltersEnum>

//.........................ARTIFACTS.........................//
export const Artifact = z.object({
    displayName: z.string(),
    collection: z.object({
        slug: z.string(),
        category: z.object({
            slug: z.string(),
        })
    }),
    culturalAffiliation: z.object({
        id: z.string(),
    }),
    monument: z.object({
        id: z.string(),
    }),
    techniques: z.object({
        id: z.string(),
    }).array(),
})
export type Artifact = z.infer<typeof Artifact>;

export const ArtiFilters = z.object({
    totalCount: z.number(),
    edges: z.object({
        node: z.object({
            __typename: FiltersEnum,
            id: z.string(),
            displayName: z.string(),
            artifacts: Artifact.array()
        })
    }).array()
});
export type ArtiFilters = z.infer<typeof ArtiFilters>;

//.........................LOCATIONS.........................//
export const LocationsArti = z.object({
    totalCount: z.number(),
    edges: z.object({
        node: z.object({
            __typename: FiltersEnum,
            id: z.string(),
            displayName: z.string(),
            locations: z.object({
                artifacts: Artifact.array()
            }).array()
        })
    }).array()
});
export type LocationsArti = z.infer<typeof LocationsArti>;