import { z } from "zod";
import { ArtifactById } from "../objects-schema";

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
        displayName: z.string().min(1),
        description: z.string().optional(),
        typology: z.string().optional(),
        chemicalComposition: z.string().optional(),
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
    }).array()
})

//.........................CULTURES.........................//
export const CulturesForTable = z.object({
    cultures: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type CulturesForTable = z.infer<typeof CulturesForTable>;

//.........................SETS.........................//
export const SetsForTable = z.object({
    sets: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type SetsForTable = z.infer<typeof SetsForTable>;

//.........................MONUMENTS.........................//
export const MonumentsForTable = z.object({
    monuments: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type MonumentsForTable = z.infer<typeof MonumentsForTable>;

//.........................MATERIALS.........................//
export const MaterialsForTable = z.object({
    media: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type MaterialsForTable = z.infer<typeof MaterialsForTable>;

//.........................TECHNIQUES.........................//
export const TechniquesForTable = z.object({
    techniques: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type TechniquesForTable = z.infer<typeof TechniquesForTable>;

//.........................AUTHORS.........................//
export const AuthorsForTable = z.object({
    persons: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type AuthorsForTable = z.infer<typeof AuthorsForTable>;

//.........................PUBLICATIONS.........................//
export const PublicationsForTable = z.object({
    publications: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type PublicationsForTable = z.infer<typeof PublicationsForTable>;

//.........................PROJECTS.........................//
export const ProjectsForTable = z.object({
    projects: z.object({
        edges: z.object({
            node: z.object({
              id: z.string(),
              displayName: z.string()
            })
        }).array()
    })
})
export type ProjectsForTable = z.infer<typeof ProjectsForTable>;


