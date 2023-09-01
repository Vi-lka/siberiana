import { z } from "zod";

//.........................FILTERS ENUMS.........................//
export const ArtiFiltersEnum = z.enum([ 
    "Culture", 
    "Set",
    "Monument", 
    "Technique",
])
export type ArtiFiltersEnum = z.infer<typeof ArtiFiltersEnum>

export const LocationsEnum = z.enum([  
    "Location", 
    "Country",
    "Region",
    "District",
    "Settlement"
])
export type LocationsEnum = z.infer<typeof LocationsEnum>

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
    }).nullable(),
    set: z.object({
        id: z.string(),
    }).nullable(),
    monument: z.object({
        id: z.string(),
    }).nullable(),
    techniques: z.object({
        id: z.string(),
    }).array(),
    location: z.object({
        country: z.object({
            id: z.string(),
        }).nullable(),
        region: z.object({
            id: z.string(),
        }).nullable(),
        district: z.object({
            id: z.string(),
        }).nullable(),
        settlement: z.object({
            id: z.string(),
        }).nullable()
    }).nullable(),
})
export type Artifact = z.infer<typeof Artifact>;

export const ArtiNode = z.object({
    __typename: ArtiFiltersEnum,
    id: z.string(),
    displayName: z.string(),
    artifacts: Artifact.array()
})
export type ArtiNode = z.infer<typeof ArtiNode>;

export const LocationsArtiNode = z.object({
    __typename: LocationsEnum,
    id: z.string(),
    displayName: z.string(),
    locations: z.object({
        artifacts: Artifact.array()
    }).array()
})
export type LocationsArtiNode = z.infer<typeof LocationsArtiNode>;

export const ArtiFilters = z.object({
    totalCount: z.number(),
    edges: z.object({
        node: z.union([ArtiNode, LocationsArtiNode])
    }).array()
});
export type ArtiFilters = z.infer<typeof ArtiFilters>;

