import { z } from "zod";

//.........................IMAGE.........................// 
export const Image = z.object({
  data: z.object({
    attributes: z.object({
      url: z.string().trim()
    })
  }).nullable()
});

//.........................PROJECTS.........................// 
export const ProjectSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
  attributes: z.object({
    Name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    Content: z.string(),
    Short_description: z.string().max(300, { message: "Must be 300 or fewer characters long" }),
    Image: Image
  })
});

export type ProjectType = z.infer<typeof ProjectSchema>;

export const ProjectsSchema = ProjectSchema.array()

export type ProjectsType = z.infer<typeof ProjectsSchema>;
