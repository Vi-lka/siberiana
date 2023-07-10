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
    .nullable().optional(),
});
export type ImageType = z.infer<typeof ImageSchema>;

//.........................PROJECT.........................//
export const ProjectSchema = z.object({
  attributes: z.object({
    Name: z.string(),
    Content: z.string().nullable(),
    Description: z.string().nullable(),
    Image: ImageSchema,
  }),
});
export type ProjectType = z.infer<typeof ProjectSchema>;

//.........................PROJECTS.........................//
export const ProjectsSchema = ProjectSchema.array();
export type ProjectsType = z.infer<typeof ProjectsSchema>;

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
export const CustomBlockSchema = z.object({
  title: z.string(),
  url: z.string(),
  textUrl: z.string(),
  list: z.object({
    title: z.string(),
    url: z.string(),
    img: ImageSchema
  }).array()
})
export type CustomBlockType = z.infer<typeof CustomBlockSchema>;

//.........................ORGANIZATIONS.........................//
export const OrganizationBySlugSchema = z.object({
  title: z.string(),
  slug: z.string(),
  image: ImageSchema,
  consortium: z.boolean(),
  url: z.string().url().nullable(),
  collections: z.object({
    title: z.string(),
    url: z.string().url(),
    textUrl: z.string(),
    list: z.object({
      title: z.string(),
      url: z.string().url(),
      img: ImageSchema
    }).array()
  }).nullable(),
  exhibits: z.object({
    title: z.string(),
    url: z.string().url(),
    textUrl: z.string(),
    list: z.object({
      name: z.string(),
      description: z.string(),
      url: z.string().url(),
      image: ImageSchema
    }).array()
  }).nullable(),
  events: z.object({
    title: z.string(),
    url: z.string().url().nullable(),
    textUrl: z.string().nullable(),
    list: z.object({
      name: z.string(),
      dateStart: z.string(),
      dateEnd: z.string(),
      cost: z.number().nullable(),
      url: z.string().url(),
      address: z.string(),
      image: ImageSchema
    }).array()
  }).nullable(),
  contacts: z.object({
    title: z.string(),
    map: z.string(),
    schedule: z.object({
      monday: z.string(),
      tuesday: z.string(),
      wednesday: z.string(),
      thursday: z.string(),
      friday: z.string(),
      saturday: z.string(),
      sunday: z.string()
    })
  }).nullable()
})
export type OrganizationBySlugType = z.infer<typeof OrganizationBySlugSchema>;

export const OrganizationsSchema = z.object({
  attributes: OrganizationBySlugSchema
}).array();
export type OrganizationsType = z.infer<typeof OrganizationsSchema>;

//.........................QUESTION.........................//
export const QuestionSchema = z.object({
  attributes: z.object({
    title: z.string(),
    image: ImageSchema,
    tip: z.string(),
    variants: z.array(
      z.object({
        title: z.string(),
        index: z.number()
      })
    ),
    answerIndex: z.number(),
    url: z.string(),
    urlName: z.string(),
  })
});
export type QuestionType = z.infer<typeof QuestionSchema>;

export const QuestionsSchema = z.object({
  questions: z.object({
    data: QuestionSchema.array()
  })
});
export type QuestionsType = z.infer<typeof QuestionsSchema>;
