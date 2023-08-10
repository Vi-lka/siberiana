import { z } from "zod";

//.........................IMAGE.........................//
export const ImageSchema = z.object({
  data: z
    .object({
      attributes: z.object({
        url: z.string(),
        alternativeText: z.string().optional().nullable(),
      }),
    })
    .nullable()
    .optional(),
});
export type ImageType = z.infer<typeof ImageSchema>;

//.........................SLIDER.........................//
export const SliderSchema = z.array(
  z.object({
    attributes: z.object({
      url: z.string(),
      alternativeText: z.string().nullable(),
    }),
  }),
);
export type SliderType = z.infer<typeof SliderSchema>;

//.........................CUSTOM.........................//
export const CustomBlockSchema = z.object(
  {
    title: z.string(),
    url: z.string().url(),
    textUrl: z.string(),
    list: z
      .object({
        title: z.string(),
        url: z.string().url(),
        img: ImageSchema,
      })
      .array(),
  },
  {
    required_error: "Custom Block missing",
  },
);
export type CustomBlockType = z.infer<typeof CustomBlockSchema>;

//.........................QUESTION.........................//
export const QuestionSchema = z.object({
  attributes: z.object({
    title: z.string(),
    image: ImageSchema,
    tip: z.string(),
    variants: z.array(
      z.object({
        title: z.string(),
        index: z.number(),
      }),
    ),
    answerIndex: z.number(),
    url: z.string().url(),
    urlName: z.string(),
  }),
});
export type QuestionType = z.infer<typeof QuestionSchema>;

export const QuestionsSchema = z.object({
  questions: z.object({
    data: QuestionSchema.array(),
  }),
});
export type QuestionsType = z.infer<typeof QuestionsSchema>;

//.........................ORGANIZATIONS.........................//
export const OrganizationBySlugSchema = z.object({
  title: z.string(),
  slug: z.string(),
  image: ImageSchema,
  consortium: z.boolean(),
  url: z.string().url().nullable(),
  collections: z
    .object({
      title: z.string(),
      url: z.string().url(),
      textUrl: z.string(),
      list: z
        .object({
          title: z.string(),
          url: z.string().url(),
          img: ImageSchema,
        })
        .array(),
    })
    .nullable(),
  exhibits: z
    .object({
      title: z.string(),
      url: z.string().url(),
      textUrl: z.string(),
      list: z
        .object({
          name: z.string().nullable(),
          description: z.string().nullable(),
          url: z.string().url(),
          image: ImageSchema,
        })
        .array(),
    })
    .nullable(),
  events_organization: z.object({
    data: z
      .object({
        attributes: z.object({
          title: z.string(),
          url: z.string().url().nullable(),
          textUrl: z.string().nullable(),
          list: z
            .object({
              name: z.string(),
              dateStart: z.string(),
              dateEnd: z.string(),
              cost: z.string().nullable(),
              url: z.string().url(),
              address: z.string(),
              image: ImageSchema,
            })
            .array(),
        }),
      })
      .nullable(),
  }),
  contacts: z
    .object({
      title: z.string(),
      map: z.string(),
      schedule: z.object({
        monday: z.string(),
        tuesday: z.string(),
        wednesday: z.string(),
        thursday: z.string(),
        friday: z.string(),
        saturday: z.string(),
        sunday: z.string(),
      }),
    })
    .nullable(),
});
export type OrganizationBySlugType = z.infer<typeof OrganizationBySlugSchema>;

export const OrganizationSingleSchema = z.object({
  attributes: z.object({
    title: z.string(),
    slug: z.string(),
    image: ImageSchema,
    consortium: z.boolean(),
  }),
})
export type OrganizationSingleType = z.infer<typeof OrganizationSingleSchema>;

export const OrganizationsSchema = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    })
  }),
  data: OrganizationSingleSchema.array()
});
export type OrganizationsType = z.infer<typeof OrganizationsSchema>;

//.........................PROJECTS.........................//
export const ProjectSingleSchema = z.object({
  attributes: z.object({
    title: z.string(),
    description: z.string().nullable(),
    url: z.string().url(),
    image: ImageSchema,
  }),
})
export type ProjectSingleType = z.infer<typeof ProjectSingleSchema>;

export const ProjectsSchema = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    })
  }),
  data: ProjectSingleSchema.array()
});
export type ProjectsType = z.infer<typeof ProjectsSchema>;

//.........................SERVICES.........................//
export const ServiceSingleSchema = z.object({
  attributes: z.object({
    title: z.string(),
    description: z.string().nullable(),
    url: z.string().url(),
    image: ImageSchema,
  }),
})
export type ServiceSingleType = z.infer<typeof ServiceSingleSchema>;

export const ServicesSchema = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    })
  }),
  data: ProjectSingleSchema.array()
});
export type ServicesType = z.infer<typeof ServicesSchema>;

//.........................ABOUT.........................//
export const AboutSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  team: z.object({
    name: z.string(),
    description: z.string(),
    image: ImageSchema
  }).array()
})
export type AboutType = z.infer<typeof AboutSchema>;

//.........................FAQ.........................//
export const FAQSchema = z.object({
  category: z.object({
    title: z.string(),
    item: z.object({
      question: z.string(),
      answer: z.string()
    }).array()
  }).array()
})
export type FAQType = z.infer<typeof FAQSchema>;



