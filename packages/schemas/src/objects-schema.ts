import { z } from "zod";

export const StatusEnum = z.enum([ 
    "listed", 
    "unlisted",
    "draft"
])
export type StatusEnum = z.infer<typeof StatusEnum>;

//.........................CATEGORY.........................//
export const Category = z.object({
    slug: z.string(),
    displayName: z.string(),
});
export type Category = z.infer<typeof Category>;

//.........................COLLECTION.........................//
export const Collection = z.object({
    id: z.string(),
    slug: z.string(),
    displayName: z.string(),
    category: Category
});
export type Collection = z.infer<typeof Collection>;

//.........................LOCATION.........................//
export const Location = z.object({
    id: z.string(),
    displayName: z.string(),
    country: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable().optional(),
    region: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable().optional(),
    district: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable().optional(),
    settlement: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable().optional(),
});
export type Location = z.infer<typeof Location>;

//.........................ARTIFACT.........................//
export const ArtifactById = z.object({
    id: z.string(),
    status: StatusEnum,
    displayName: z.string(),
    description: z.string(),
    primaryImageURL: z.string(),
    additionalImagesUrls: z.string().array().nullable(),
    admissionDate: z.preprocess((val) => new Date(val as string), z.date()).nullable(),
    chemicalComposition: z.string(),
    typology: z.string(),
    weight: z.string(),
    width: z.number(),
    height: z.number(),
    length: z.number(),
    depth: z.number(),
    diameter: z.number(),
    datingStart: z.number().int(),
    datingEnd: z.number().int(),
    dating: z.string(),
    dimensions: z.string(),
    inventoryNumber: z.string(),
    kpNumber: z.string(),
    goskatalogNumber: z.string(),
    externalLink: z.string(),
    collection: Collection,
    location: Location.nullable(),
    country: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable(),
    region: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable(),
    district: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable(),
    settlement: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable(),
    donor: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable(),
    mediums: z.object({
        id: z.string(),
        displayName: z.string(),  
    }).array(),
    authors: z.object({
        id: z.string(),
        displayName: z.string(),  
    }).array(),
    projects: z.object({
        id: z.string(),
        displayName: z.string(),  
    }).array(),
    publications: z.object({
        id: z.string(),
        displayName: z.string(),  
    }).array(),
    techniques: z.object({
        id: z.string(),
        displayName: z.string(),  
    }).array(),
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
    model: z.object({
        id: z.string(),
        displayName: z.string(),
    }).nullable(),
    createdBy: z.string().optional(),
    createdAt: z.preprocess((val) => new Date(val as string), z.date()).optional(),
    updatedBy: z.string().optional(),
    updatedAt: z.preprocess((val) => new Date(val as string), z.date()).optional(),
});
export type ArtifactById = z.infer<typeof ArtifactById>;

//.........................BOOK.........................//
export const BookById = z.object({
    id: z.string(),
    status: StatusEnum,
    displayName: z.string(),
    description: z.string(),
    primaryImageURL: z.string(),
    additionalImagesUrls: z.string().array().nullable(),
    year: z.number(),
    collection: Collection,
    location: Location.nullable(),
    bookGenres: z.object({
        displayName: z.string(),  
    }).array(),
    authors: z.object({
        displayName: z.string(),  
    }).array(),
    license: z.object({
        displayName: z.string(),  
    }).nullable(),
    publisher: z.object({
        displayName: z.string(),  
    }).nullable(),
    files: z.string().array()
});
export type BookById = z.infer<typeof BookById>;

//.........................PAP (protectedAreaPictures).........................//
export const ProtectedArea = z.object({
    displayName: z.string(),
    description: z.string(),
    area: z.string(),
    establishmentDate: z.preprocess((val) => new Date(val as string), z.date()).nullable(),
    protectedAreaCategory: z.object({
        displayName: z.string(),  
    }).nullable(),
});
export type ProtectedArea = z.infer<typeof ProtectedArea>;

export const PAPById = z.object({
    id: z.string(),
    status: StatusEnum,
    displayName: z.string(),
    description: z.string(),
    primaryImageURL: z.string(),
    additionalImagesUrls: z.string().array().nullable(),
    shootingDate: z.preprocess((val) => new Date(val as string), z.date()).nullable(),
    collection: Collection,
    location: Location.nullable(),
    protectedArea: ProtectedArea.nullable(),
    license: z.object({
        displayName: z.string(),  
    }).nullable(),
});
export type PAPById = z.infer<typeof PAPById>;