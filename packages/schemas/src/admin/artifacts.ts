import { z } from "zod";
import { ArtifactById, StatusEnum } from "../objects-schema";
import { Location } from "../objects-schema"

//.........................ARTIFACTS.........................//
export const ArtifactsArray = z.object({
    totalCount: z.number(),
    edges: z.object({
        node: ArtifactById
    }).array()
});
export type ArtifactsArray = z.infer<typeof ArtifactsArray>;

export const ArtifactsTable = z.object({
    artifacts: z.object({
        id: z.string(),
        status: z.object({
            id: StatusEnum,
            displayName: z.string(),
        }),
        displayName: z.string().min(1),
        description: z.string().optional(),
        typology: z.string().optional(),
        chemicalComposition: z.string().optional(),
        admissionDate: z.date().nullable().optional(),
        culturalAffiliation: z.object({
            id: z.string(),
            displayName: z.string().optional(),
        }).nullable(),
        set: z.object({
            id: z.string(),
            displayName: z.string().optional(),
        }).nullable(),
        monument: z.object({
            id: z.string(),
            displayName: z.string().optional(),
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
        location: Location.nullable(),
        createdBy: z.string(),
        createdAt: z.date(),
        updatedBy: z.string(),
        updatedAt: z.date(),
    }).array()
})

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


