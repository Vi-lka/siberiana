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
        displayName: z.string().optional(),
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

