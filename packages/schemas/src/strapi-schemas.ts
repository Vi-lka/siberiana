import { z } from "zod";

//.........................IMAGE.........................//
export const ImageSchema = z.object({
  data: z
    .object({
      attributes: z.object({
        url: z.string().url(),
        alternativeText: z.string().optional(),
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
      url: z.string().url(),
      alternativeText: z.string().nullable(),
    }),
  }),
);
export type SliderType = z.infer<typeof SliderSchema>;

//.........................CUSTOM.........................//
export const CustomBlockSchema = z.object({
  Title: z.string(),
  url: z.string().url(),
  TextUrl: z.string(),
  List: z.object({
    title: z.string(),
    url: z.string().url(),
    img: ImageSchema
  }).array()
})
export type CustomBlockType = z.infer<typeof CustomBlockSchema>;

//.........................QUESTION.........................//
export const QuestionSchema = z.object({
  attributes: z.object({
    Title: z.string(),
    Image: ImageSchema,
    Tip: z.string(),
    Variant: z.array(
      z.object({
        Title: z.string(),
        Index: z.number()
      })
    ),
    AnswerIndex: z.number(),
    url: z.string().url(),
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
