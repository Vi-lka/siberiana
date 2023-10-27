import { z } from "zod";
import { ArtifactById } from "../objects-schema";

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
        culturalAffiliation: z.object({
            id: z.string(),
            displayName: z.string().optional(),
        }).nullable()
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
