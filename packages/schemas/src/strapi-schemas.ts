import { z } from "zod";

//.........................IMAGE.........................//
export const Image = z.object({
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
export type Image = z.infer<typeof Image>;

//.........................SLIDER.........................//
export const Slider = z.array(
  z.object({
    attributes: z.object({
      url: z.string(),
      alternativeText: z.string().nullable(),
    }),
  }),
);
export type Slider = z.infer<typeof Slider>;

//.........................CUSTOM BLOCK.........................//
export const CustomBlock = z.object(
  {
    title: z.string(),
    url: z.string().url(),
    textUrl: z.string(),
    list: z
      .object({
        title: z.string(),
        url: z.string().url(),
        img: Image,
      })
      .array(),
  },
  {
    required_error: "Custom Block missing",
  },
)
export type CustomBlock = z.infer<typeof CustomBlock>;

//.........................QUESTIONS.........................//
export const Question = z.object({
  attributes: z.object({
    title: z.string(),
    image: Image,
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
export type Question = z.infer<typeof Question>;

export const Questions = z.object({
  questions: z.object({
    data: Question.array(),
  }),
});
export type Questions = z.infer<typeof Questions>;

//.........................ORGANIZATIONS.........................//
export const OrganizationBySlug = z.object({
  title: z.string(),
  slug: z.string(),
  image: Image,
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
          img: Image,
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
          image: Image,
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
              image: Image,
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
export type OrganizationBySlug = z.infer<typeof OrganizationBySlug>;

export const Organization = z.object({
  attributes: z.object({
    title: z.string(),
    slug: z.string(),
    image: Image,
    consortium: z.boolean(),
  }),
})
export type Organization = z.infer<typeof Organization>;

export const Organizations = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    })
  }),
  data: Organization.array()
});
export type Organizations = z.infer<typeof Organizations>;

//.........................PROJECTS.........................//
export const Project = z.object({
  attributes: z.object({
    title: z.string(),
    description: z.string().nullable(),
    url: z.string().url(),
    image: Image,
  }),
})
export type Project = z.infer<typeof Project>;

export const Projects = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    })
  }),
  data: Project.array()
});
export type Projects = z.infer<typeof Projects>;

//.........................SERVICES.........................//
export const Service = z.object({
  attributes: z.object({
    title: z.string(),
    description: z.string().nullable(),
    url: z.string().url(),
    image: Image,
  }),
})
export type Service = z.infer<typeof Service>;

export const Services = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    })
  }),
  data: Service.array()
});
export type Services = z.infer<typeof Services>;

//.........................ABOUT.........................//
export const About = z.object({
  title: z.string(),
  description: z.string().nullable(),
  team: z.object({
    name: z.string(),
    description: z.string(),
    image: Image
  }).array()
})
export type About = z.infer<typeof About>;

//.........................FAQ.........................//
export const FAQ = z.object({
  category: z.object({
    title: z.string(),
    item: z.object({
      question: z.string(),
      answer: z.string()
    }).array()
  }).array()
})
export type FAQ = z.infer<typeof FAQ>;



