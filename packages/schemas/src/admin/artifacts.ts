import { z } from "zod";
import { ArtifactById, StatusEnum } from "../objects-schema";

export const LocationEnum = z.enum([ 
    "location", 
    "country",
    "region",
    "district",
    "settlement"
])
export type LocationEnum = z.infer<typeof LocationEnum>;

export const Sizes = z.object({
    width: z.number(),
    height: z.number(),
    length: z.number(),
    depth: z.number(),
    diameter: z.number(),
});
export type Sizes = z.infer<typeof Sizes>;

export const Dating = z.object({
    datingStart: z.number().int(),
    datingEnd: z.number().int(),
});
export type Dating = z.infer<typeof Dating>;

//.........................ARTIFACTS.........................//
export const ArtifactsArray = z.object({
    totalCount: z.number(),
    edges: z.object({
        node: ArtifactById
    }).array()
});
export type ArtifactsArray = z.infer<typeof ArtifactsArray>;

export const ArtifactForTable = z.object({
    id: z.string(),
    status: z.object({
        id: StatusEnum,
        displayName: z.string(),
    }),
    displayName: z.string().min(1),
    primaryImageURL: z.string(),
    description: z.string().optional(),
    chemicalComposition: z.string().optional(),
    typology: z.string().optional(),
    weight: z.string().optional(),
    sizes: Sizes,
    datingRow: Dating,
    dating: z.string().optional(),
    dimensions: z.string().optional(),
    inventoryNumber: z.string().optional(),
    kpNumber: z.string().optional(),
    goskatalogNumber: z.string().optional(),
    externalLink: z.union([z.literal(""), z.string().trim().url()]).optional(),
    admissionDate: z.date().nullable().optional(),
    collection: z.object({
        id: z.string(),
        displayName: z.string(),
    }),
    license: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable(),
    culturalAffiliation: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable(),
    set: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable(),
    monument: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable(),
    location: z.object({
        id: z.string(),
        displayName: z.string(),
        type: LocationEnum,
    }).nullable(),
    donor: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable(),
    model: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable(),
    mediums: z.object({
        id: z.string(),
        displayName: z.string(),  
    }).array(),
    techniques: z.object({
        id: z.string(),
        displayName: z.string(),  
    }).array(),
    authors: z.object({
        id: z.string(),
        displayName: z.string(),  
    }).array(),
    publications: z.object({
        id: z.string(),
        displayName: z.string(),  
    }).array(),
    projects: z.object({
        id: z.string(),
        displayName: z.string(),  
    }).array(),
    createdBy: z.string().optional(),
    createdAt: z.date().optional(),
    updatedBy: z.string().optional(),
    updatedAt: z.date().optional(),
})
export type ArtifactForTable = z.infer<typeof ArtifactForTable>;

export const ArtifactsForm = z.object({
    artifacts: ArtifactForTable.array()
})
export type ArtifactsForm = z.infer<typeof ArtifactsForm>;

//.........................CULTURES.........................//
export const CulturesList = z.object({
    cultures: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type CulturesList = z.infer<typeof CulturesList>;

export const CulturesArray = z.object({
    totalCount: z.number(),
    edges: z.object({
        node: z.object({
            id: z.string(),
            displayName: z.string().min(1),
            description: z.string(),
            externalLink: z.string(),
            artifacts: z.object({
                id: z.string()
            }).array(),
            petroglyphs: z.object({
                id: z.string()
            }).array(),
            createdBy: z.string().optional(),
            createdAt: z.preprocess((val) => new Date(val as string), z.date()).optional(),
            updatedBy: z.string().optional(),
            updatedAt: z.preprocess((val) => new Date(val as string), z.date()).optional(),
        })
    }).array()
})
export type CulturesArray = z.infer<typeof CulturesArray>;

export const CultureForTable = z.object({
    id: z.string(),
    displayName: z.string().min(1),
    description: z.string().optional(),
    externalLink: z.union([z.literal(""), z.string().trim().url()]).optional(),
    artifacts: z.number().optional(),
    petroglyphs: z.number().optional(),
    createdBy: z.string().optional(),
    createdAt: z.date().optional(),
    updatedBy: z.string().optional(),
    updatedAt: z.date().optional(),
})
export type CultureForTable = z.infer<typeof CultureForTable>;

export const CulturesForm = z.object({
    cultures: CultureForTable.array()
})
export type CulturesForm = z.infer<typeof CulturesForm>;

//.........................SETS.........................//
export const SetsList = z.object({
    sets: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type SetsList = z.infer<typeof SetsList>;

//.........................MONUMENTS.........................//
export const MonumentsList = z.object({
    monuments: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type MonumentsList = z.infer<typeof MonumentsList>;

//.........................MATERIALS.........................//
export const MaterialsList = z.object({
    media: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type MaterialsList = z.infer<typeof MaterialsList>;

//.........................TECHNIQUES.........................//
export const TechniquesList = z.object({
    techniques: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type TechniquesList = z.infer<typeof TechniquesList>;

//.........................MODELS.........................//
export const ModelsList = z.object({
    models: z.object({
        edges: z.object({
            node: z.object({
                id: z.string(),
                displayName: z.string(),
            })
        }).array()
    })
})
export type ModelsList = z.infer<typeof ModelsList>;


