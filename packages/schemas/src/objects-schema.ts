import { z } from "zod";

export const StatusEnum = z.enum([ 
    "listed", 
    "unlisted",
    "draft"
])

//.........................CATEGORY.........................//
export const Category = z.object({
    slug: z.string(),
    displayName: z.string(),
});
export type Category = z.infer<typeof Category>;

//.........................COLLECTION.........................//
export const Collection = z.object({
    slug: z.string(),
    displayName: z.string(),
    category: Category
});
export type Collection = z.infer<typeof Collection>;

//.........................LOCATION.........................//
export const Location = z.object({
    displayName: z.string(),
    country: z.object({
        displayName: z.string(),
    }).nullable(),
    region: z.object({
        displayName: z.string(),
    }).nullable(),
    district: z.object({
        displayName: z.string(),
    }).nullable(),
    settlement: z.object({
        displayName: z.string(),
    }).nullable(),
});
export type Location = z.infer<typeof Location>;

//.........................HOLDERS.........................//
export const Holders = z.object({
    organization: z.object({
        displayName: z.string(),
    }).nullable(),
    person: z.object({
        displayName: z.string(),
    }).nullable(),
}).array();
export type Holders = z.infer<typeof Holders>;

//.........................ARTIFACT.........................//
export const ArtifactById = z.object({
    id: z.string(),
    status: StatusEnum,
    displayName: z.string(),
    description: z.string(),
    primaryImageURL: z.string(),
    additionalImagesUrls: z.string().array().nullable(),
    dating: z.string(),
    admissionDate: z.string().nullable(),
    chemicalComposition: z.string(),
    typology: z.string(),
    weight: z.string(),
    collection: Collection,
    location: Location.nullable(),
    // holders: Holders,
    mediums: z.object({
        displayName: z.string(),  
    }).array(),
    authors: z.object({
        displayName: z.string(),  
    }).array(),
    projects: z.object({
        displayName: z.string(),  
    }).array(),
    publications: z.object({
        displayName: z.string(),  
    }).array(),
    techniques: z.object({
        displayName: z.string(),  
    }).array(),
    license: z.object({
        displayName: z.string(),  
    }).nullable(),
    culturalAffiliation: z.object({
        displayName: z.string(),  
    }).nullable(),
    period: z.object({
        displayName: z.string(),  
    }).nullable(),
    set: z.object({
        displayName: z.string(),  
    }).nullable(),
    monument: z.object({
        displayName: z.string(),  
    }).nullable(),
    model: z.object({
        displayName: z.string(),  
    }).nullable(),
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
    establishmentDate: z.string(),
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
    shootingDate: z.string(),
    collection: Collection,
    location: Location.nullable(),
    protectedArea: ProtectedArea,
    license: z.object({
        displayName: z.string(),  
    }).nullable(),
});
export type PAPById = z.infer<typeof PAPById>;