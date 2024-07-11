import { z } from "zod";

import { CollectionTypeEnum } from "../collections-schemas";
import { Country, District, Location, Region, Settlement } from "../objects-schema";

export const Item = z.object({
  id: z.string(),
  displayName: z.string(),
});
export type Item = z.infer<typeof Item>;

export const EntityEnum = z.enum([
  // "art",
  "artifacts",
  "cultures",
  "ethnosSlice",
  "materials",
  "techniques",
  "sets",
  "monuments",
  "models",
  "books",
  "bookGenres",
  "periodicals",
  // "protected_area_pictures",
  "locations",
  "countries",
  "regions",
  "districts",
  "settlements",
]);
export type EntityEnum = z.infer<typeof EntityEnum>;

export const CustomFile = z.custom<File>();
export type CustomFile = z.infer<typeof CustomFile>;

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
    file: CustomFile.nullable().optional(),
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
    file: CustomFile.nullable().optional(),
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

export const LocationsArray = z.object({
  totalCount: z.number(),
  edges: z
    .object({
      node: z.object({
        id: z.string(),
        displayName: z.string().min(1),
        description: z.string(),
        externalLink: z.string(),
        artifacts: z
          .object({
            id: z.string(),
          })
          .array(),
        books: z
          .object({
            id: z.string(),
          })
          .array(),
        country: z
        .object({
          id: z.string(),
          displayName: z.string(),
        })
        .nullable(),
        region: z
        .object({
          id: z.string(),
          displayName: z.string(),
        })
        .nullable(),
        district: z
        .object({
          id: z.string(),
          displayName: z.string(),
        })
        .nullable(),
        settlement: z
        .object({
          id: z.string(),
          displayName: z.string(),
        })
        .nullable(),
        createdBy: z.string().optional(),
        createdAt: z
          .preprocess((val) => new Date(val as string), z.date())
          .optional(),
        updatedBy: z.string().optional(),
        updatedAt: z
          .preprocess((val) => new Date(val as string), z.date())
          .optional(),
      }),
    })
    .array(),
});
export type LocationsArray = z.infer<typeof LocationsArray>;

export const LocationsForTable = z.object({
  id: z.string(),
  displayName: z.string().min(1),
  description: z.string().optional(),
  externalLink: z.union([z.literal(""), z.string().trim().url()]).optional(),
  country: z
  .object({
    id: z.string(),
    displayName: z.string(),
  })
  .nullable(),
  region: z
  .object({
    id: z.string(),
    displayName: z.string(),
  })
  .nullable(),
  district: z
  .object({
    id: z.string(),
    displayName: z.string(),
  })
  .nullable(),
  settlement: z
  .object({
    id: z.string(),
    displayName: z.string(),
  })
  .nullable(),
  artifacts: z.number().optional(),
  books: z.number().optional(),
  createdBy: z.string().optional(),
  createdAt: z.date().optional(),
  updatedBy: z.string().optional(),
  updatedAt: z.date().optional(),
});
export type LocationsForTable = z.infer<typeof LocationsForTable>;

export const LocationsForm = z.object({
  locations: LocationsForTable.array(),
});
export type LocationsForm = z.infer<typeof LocationsForm>;

//.........................COUNTRIES.........................//
export const CountriesList = z.object({
  countries: z.object({
    edges: z
      .object({
        node: Country,
      })
      .array(),
  }),
});
export type CountriesList = z.infer<typeof CountriesList>;

export const CountriesArray = z.object({
  totalCount: z.number(),
  edges: z
    .object({
      node: z.object({
        id: z.string(),
        displayName: z.string().min(1),
        description: z.string(),
        externalLink: z.string(),
        artifacts: z
          .object({
            id: z.string(),
          })
          .array(),
        books: z
          .object({
            id: z.string(),
          })
          .array(),
        locations: z
          .object({
            id: z.string(),
          })
          .array(),
        regions: z
        .object({
          id: z.string(),
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
      }),
    })
    .array(),
});
export type CountriesArray = z.infer<typeof CountriesArray>;

export const CountriesForTable = z.object({
  id: z.string(),
  displayName: z.string().min(1),
  description: z.string().optional(),
  externalLink: z.union([z.literal(""), z.string().trim().url()]).optional(),
  artifacts: z.number().optional(),
  books: z.number().optional(),
  locations: z.number().optional(),
  regions: z.number().optional(),
  createdBy: z.string().optional(),
  createdAt: z.date().optional(),
  updatedBy: z.string().optional(),
  updatedAt: z.date().optional(),
});
export type CountriesForTable = z.infer<typeof CountriesForTable>;

export const CountriesForm = z.object({
  countries: CountriesForTable.array(),
});
export type CountriesForm = z.infer<typeof CountriesForm>;

//.........................REGIONS.........................//
export const RegionsList = z.object({
  regions: z.object({
    edges: z
      .object({
        node: Region,
      })
      .array(),
  }),
});
export type RegionsList = z.infer<typeof RegionsList>;

export const RegionsArray = z.object({
  totalCount: z.number(),
  edges: z
    .object({
      node: z.object({
        id: z.string(),
        displayName: z.string().min(1),
        description: z.string(),
        externalLink: z.string(),
        country: z
        .object({
          id: z.string(),
          displayName: z.string(),
        })
        .nullable(),
        artifacts: z
          .object({
            id: z.string(),
          })
          .array(),
        books: z
          .object({
            id: z.string(),
          })
          .array(),
        locations: z
          .object({
            id: z.string(),
          })
          .array(),
        districts: z
          .object({
            id: z.string(),
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
      }),
    })
    .array(),
});
export type RegionsArray = z.infer<typeof RegionsArray>;

export const RegionsForTable = z.object({
  id: z.string(),
  displayName: z.string().min(1),
  description: z.string().optional(),
  externalLink: z.union([z.literal(""), z.string().trim().url()]).optional(),
  country: z
  .object({
    id: z.string(),
    displayName: z.string(),
  })
  .nullable(),
  artifacts: z.number().optional(),
  books: z.number().optional(),
  locations: z.number().optional(),
  districts: z.number().optional(),
  createdBy: z.string().optional(),
  createdAt: z.date().optional(),
  updatedBy: z.string().optional(),
  updatedAt: z.date().optional(),
});
export type RegionsForTable = z.infer<typeof RegionsForTable>;

export const RegionsForm = z.object({
  regions: RegionsForTable.array(),
});
export type RegionsForm = z.infer<typeof RegionsForm>;

//.........................DISTRICTS.........................//
export const DistrictsList = z.object({
  districts: z.object({
    edges: z
      .object({
        node: District,
      })
      .array(),
  }),
});
export type DistrictsList = z.infer<typeof DistrictsList>;

export const DistrictsArray = z.object({
  totalCount: z.number(),
  edges: z
    .object({
      node: z.object({
        id: z.string(),
        displayName: z.string().min(1),
        description: z.string(),
        externalLink: z.string(),
        region: z
        .object({
          id: z.string(),
          displayName: z.string(),
        })
        .nullable(),
        artifacts: z
          .object({
            id: z.string(),
          })
          .array(),
        books: z
          .object({
            id: z.string(),
          })
          .array(),
        locations: z
          .object({
            id: z.string(),
          })
          .array(),
        settlements: z
          .object({
            id: z.string()
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
      }),
    })
    .array(),
});
export type DistrictsArray = z.infer<typeof DistrictsArray>;

export const DistrictsForTable = z.object({
  id: z.string(),
  displayName: z.string().min(1),
  description: z.string().optional(),
  externalLink: z.union([z.literal(""), z.string().trim().url()]).optional(),
  region: z
  .object({
    id: z.string(),
    displayName: z.string(),
  })
  .nullable(),
  artifacts: z.number().optional(),
  books: z.number().optional(),
  locations: z.number().optional(),
  settlements: z.number().optional(),
  createdBy: z.string().optional(),
  createdAt: z.date().optional(),
  updatedBy: z.string().optional(),
  updatedAt: z.date().optional(),
});
export type DistrictsForTable = z.infer<typeof DistrictsForTable>;

export const DistrictsForm = z.object({
  districts: DistrictsForTable.array(),
});
export type DistrictsForm = z.infer<typeof DistrictsForm>;

//.........................SETTLEMENTS.........................//
export const SettlementsList = z.object({
  settlements: z.object({
    edges: z
      .object({
        node: Settlement,
      })
      .array(),
  }),
});
export type SettlementsList = z.infer<typeof SettlementsList>;

export const SettlementsArray = z.object({
  totalCount: z.number(),
  edges: z
    .object({
      node: z.object({
        id: z.string(),
        displayName: z.string().min(1),
        description: z.string(),
        externalLink: z.string(),
        region: z
        .object({
          id: z.string(),
          displayName: z.string(),
        })
        .nullable(),
        district: z
        .object({
          id: z.string(),
          displayName: z.string(),
        })
        .nullable(),
        artifacts: z
          .object({
            id: z.string(),
          })
          .array(),
        books: z
          .object({
            id: z.string(),
          })
          .array(),
        locations: z
          .object({
            id: z.string(),
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
      }),
    })
    .array(),
});
export type SettlementsArray = z.infer<typeof SettlementsArray>;

export const SettlementsForTable = z.object({
  id: z.string(),
  displayName: z.string().min(1),
  description: z.string().optional(),
  externalLink: z.union([z.literal(""), z.string().trim().url()]).optional(),
  region: z
  .object({
    id: z.string(),
    displayName: z.string(),
  })
  .nullable(),
  district: z
  .object({
    id: z.string(),
    displayName: z.string(),
  })
  .nullable(),
  artifacts: z.number().optional(),
  books: z.number().optional(),
  locations: z.number().optional(),
  createdBy: z.string().optional(),
  createdAt: z.date().optional(),
  updatedBy: z.string().optional(),
  updatedAt: z.date().optional(),
});
export type SettlementsForTable = z.infer<typeof SettlementsForTable>;

export const SettlementsForm = z.object({
  settlements: SettlementsForTable.array(),
});
export type SettlementsForm = z.infer<typeof SettlementsForm>;



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

//.........................ORGANIZATION.........................//
export const OrganizationList = z.object({
  organizations: z.object({
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
export type OrganizationList = z.infer<typeof OrganizationList>;
