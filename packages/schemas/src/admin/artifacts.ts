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
    }).array()
})