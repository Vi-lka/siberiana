import { z } from "zod";

import { CollectionTypeEnum } from "../collections-schemas";
import { Location } from "../objects-schema";

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
