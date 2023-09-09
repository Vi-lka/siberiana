import { z } from "zod";

//.........................FILTERS ENUMS.........................//
export const ArtiFiltersEnum = z.enum([ 
    "Culture", 
    "Set",
    "Monument", 
    "Technique",
    "License",
])
export type ArtiFiltersEnum = z.infer<typeof ArtiFiltersEnum>

export const BooksFiltersEnum = z.enum([ 
    "BookGenre", 
    "License",
])
export type BooksFiltersEnum = z.infer<typeof BooksFiltersEnum>

export const PAPFiltersEnum = z.enum([ 
    "ProtectedArea", 
    "ProtectedAreaCategory",
    "License",
])
export type PAPFiltersEnum = z.infer<typeof PAPFiltersEnum>

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
    license: z.object({
        id: z.string(),
    }).nullable(),
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

//.........................BOOKS.........................//
export const Book = z.object({
    displayName: z.string(),
    collection: z.object({
        slug: z.string(),
        category: z.object({
            slug: z.string(),
        })
    }),
    bookGenres: z.object({
        id: z.string(),
    }).array(),
    license: z.object({
        id: z.string(),
    }).nullable(),
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
export type Book = z.infer<typeof Book>;

export const BooksNode = z.object({
    __typename: BooksFiltersEnum,
    id: z.string(),
    displayName: z.string(),
    books: Book.array()
})
export type BooksNode = z.infer<typeof BooksNode>;

export const LocationsBooksNode = z.object({
    __typename: LocationsEnum,
    id: z.string(),
    displayName: z.string(),
    locations: z.object({
        books: Book.array()
    }).array()
})
export type LocationsBooksNode = z.infer<typeof LocationsBooksNode>;

export const BooksFilters = z.object({
    totalCount: z.number(),
    edges: z.object({
        node: z.union([BooksNode, LocationsBooksNode])
    }).array()
});
export type BooksFilters = z.infer<typeof BooksFilters>;

//.........................PAP.........................//
export const ProtectedAreaPicture = z.object({
    displayName: z.string(),
    collection: z.object({
        slug: z.string(),
        category: z.object({
            slug: z.string(),
        })
    }),
    protectedArea: z.object({
        id: z.string(),
        protectedAreaCategory: z.object({
            id: z.string()
        }).nullable()
    }).nullable(),
    license: z.object({
        id: z.string(),
    }).nullable(),
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
export type ProtectedAreaPicture = z.infer<typeof ProtectedAreaPicture>;

export const PAPNode = z.object({
    __typename: PAPFiltersEnum,
    id: z.string(),
    displayName: z.string(),
    protectedAreaPictures: ProtectedAreaPicture.array()
})
export type PAPNode = z.infer<typeof PAPNode>;

export const PAPCategorysNode = z.object({
    __typename: PAPFiltersEnum,
    id: z.string(),
    displayName: z.string(),
    protectedAreas: z.object({
        protectedAreaPictures: ProtectedAreaPicture.array()
    }).array()
});
export type PAPCategorysNode = z.infer<typeof PAPCategorysNode>;

export const LocationsPAPNode = z.object({
    __typename: LocationsEnum,
    id: z.string(),
    displayName: z.string(),
    locations: z.object({
        protectedAreaPictures: ProtectedAreaPicture.array()
    }).array()
})
export type LocationsPAPNode = z.infer<typeof LocationsPAPNode>;

export const PAPFilters = z.object({
    totalCount: z.number(),
    edges: z.object({
        node: z.union([PAPNode, PAPCategorysNode, LocationsPAPNode])
    }).array()
});
export type PAPFilters = z.infer<typeof PAPFilters>;

