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
    typology: z.string().optional(),
    weight: z.string().optional(),
    chemicalComposition: z.string().optional(),
    admissionDate: z.date().nullable().optional(),
    collection: z.object({
        id: z.string(),
        displayName: z.string(),
    }),
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

//.........................AUTHORS.........................//
export const AuthorsList = z.object({
    persons: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type AuthorsList = z.infer<typeof AuthorsList>;

//.........................PUBLICATIONS.........................//
export const PublicationsList = z.object({
    publications: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type PublicationsList = z.infer<typeof PublicationsList>;

//.........................PROJECTS.........................//
export const ProjectsList = z.object({
    projects: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type ProjectsList = z.infer<typeof ProjectsList>;


