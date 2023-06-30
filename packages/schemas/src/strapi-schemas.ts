import { z } from "zod";

//.........................IMAGE.........................//
export const ImageSchema = z.object({
  data: z
    .object({
      attributes: z.object({
        url: z.string().trim(),
        alternativeText: z.string(),
      }),
    })
    .nullable(),
});
export type ImageType = z.infer<typeof ImageSchema>;

//.........................PROJECT.........................//
export const ProjectSchema = z.object({
  attributes: z.object({
    Name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
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
      url: z.string().trim(),
      alternativeText: z.string().nullable(),
    }),
  }),
);
export type SliderType = z.infer<typeof SliderSchema>;
