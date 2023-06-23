import { z } from "zod";

//.........................LOCALE.........................//
export const LocaleSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
  attributes: z.object({
    name: z.string({
      required_error: "name is required",
      invalid_type_error: "name must be a string",
    }),
    code: z.string({
      required_error: "code is required",
      invalid_type_error: "code must be a string",
    }),
  }),
});
export type LocaleType = z.infer<typeof LocaleSchema>;

//.........................IMAGE.........................//
export const ImageSchema = z.object({
  data: z
    .object({
      attributes: z.object({
        url: z.string().trim(),
      }),
    })
    .nullable(),
});
export type ImageType = z.infer<typeof ImageSchema>;

//.........................PROJECT.........................//
export const ProjectSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
  attributes: z.object({
    Name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    Content: z.string().nullable(),
    Short_description: z
      .string()
      .max(300, { message: "Must be 300 or fewer characters long" })
      .nullable(),
    Image: ImageSchema,
  }),
});
export type ProjectType = z.infer<typeof ProjectSchema>;

//.........................PROJECTS.........................//
export const ProjectsSchema = ProjectSchema.array();
export type ProjectsType = z.infer<typeof ProjectsSchema>;
