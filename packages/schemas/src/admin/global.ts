import { z } from "zod";

import { CollectionTypeEnum } from "../collections-schemas";
import { Location } from "../objects-schema";

// const MAX_FILE_SIZE = 10000000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const CustomFile = z.custom<File>();
export type CustomFile = z.infer<typeof CustomFile>;

export const ImageFile = z.custom<File>();
export type ImageFile = z.infer<typeof ImageFile>;

export const LocationEnum = z.enum([
  "location",
  "country",
  "region",
  "district",
  "settlement",
]);
export type LocationEnum = z.infer<typeof LocationEnum>;

//.........................CATEGORIES.........................//
export const CategoriesList = z.object({
  categories: z.object({
    edges: z
      .object({
        node: z.object({
          id: z.string(),
          displayName: z.string(),
          slug: z.string(),
        }),
      })
      .array(),
  }),
});
export type CategoriesList = z.infer<typeof CategoriesList>;

export const CategoryForm = z.object({
  id: z.string(),
  slug: z.string().min(1).regex(new RegExp("^[a-z](-?[a-z])*$")),
  displayName: z.string().min(1),
  abbreviation: z.string(),
  primaryImage: z.object({
    file: ImageFile.nullable().optional(),
    url: z.string(),
  }),
  description: z.string(),
  collections: z
    .object({
      id: z.string(),
      displayName: z.string(),
    })
    .array(),
  createdBy: z.string().optional(),
  createdAt: z
    .preprocess((val) => new Date(val as string), z.date())
    .optional(),
  updatedBy: z.string().optional(),
  updatedAt: z
    .preprocess((val) => new Date(val as string), z.date())
    .optional(),
});
export type CategoryForm = z.infer<typeof CategoryForm>;

//.........................COLLECTIONS.........................//
export const CollectionsList = z.object({
  collections: z.object({
    edges: z
      .object({
        node: z.object({
          id: z.string(),
          displayName: z.string(),
          slug: z.string(),
          type: CollectionTypeEnum,
        }),
      })
      .array(),
  }),
});
export type CollectionsList = z.infer<typeof CollectionsList>;

export const CollectionForm = z.object({
  id: z.string(),
  type: CollectionTypeEnum,
  slug: z.string().min(1).regex(new RegExp("^[a-z](-?[a-z])*$")),
  displayName: z.string().min(1),
  abbreviation: z.string(),
  primaryImage: z.object({
    file: ImageFile.nullable().optional(),
    url: z.string(),
  }),
  description: z.string(),
  category: z.object({
    id: z.string(),
    slug: z.string().optional(),
    displayName: z.string(),
  }),
  createdBy: z.string().optional(),
  createdAt: z
    .preprocess((val) => new Date(val as string), z.date())
    .optional(),
  updatedBy: z.string().optional(),
  updatedAt: z
    .preprocess((val) => new Date(val as string), z.date())
    .optional(),
});
export type CollectionForm = z.infer<typeof CollectionForm>;

//.........................LOCATIONS.........................//
export const LocationsList = z.object({
  locations: z.object({
    edges: z
      .object({
        node: Location,
      })
      .array(),
  }),
});
export type LocationsList = z.infer<typeof LocationsList>;

//.........................LICENSE.........................//
export const LicenseList = z.object({
  licenses: z.object({
    edges: z
      .object({
        node: z.object({
          id: z.string(),
          displayName: z.string(),
        }),
      })
      .array(),
  }),
});
export type LicenseList = z.infer<typeof LicenseList>;

//.........................PERSONS.........................//
export const PersonsList = z.object({
  persons: z.object({
    edges: z
      .object({
        node: z.object({
          id: z.string(),
          displayName: z.string(),
        }),
      })
      .array(),
  }),
});
export type PersonsList = z.infer<typeof PersonsList>;

//.........................PUBLICATIONS.........................//
export const PublicationsList = z.object({
  publications: z.object({
    edges: z
      .object({
        node: z.object({
          id: z.string(),
          displayName: z.string(),
        }),
      })
      .array(),
  }),
});
export type PublicationsList = z.infer<typeof PublicationsList>;

//.........................PROJECTS.........................//
export const ProjectsList = z.object({
  projects: z.object({
    edges: z
      .object({
        node: z.object({
          id: z.string(),
          displayName: z.string(),
        }),
      })
      .array(),
  }),
});
export type ProjectsList = z.infer<typeof ProjectsList>;
