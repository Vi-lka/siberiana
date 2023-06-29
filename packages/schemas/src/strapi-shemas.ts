import { z } from "zod";

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

//.........................MENU.........................//
//......MENU SINGLE LINK.......//
export const SingleLinkSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number).or(z.number()),
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  url: z.string({
    required_error: "URL is required",
    invalid_type_error: "URL must be a string",
  }),
  description: z.string().nullable(),
  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image must be a string",
  }),
});
export type SingleLinkType = z.infer<typeof SingleLinkSchema>;

//......MENU GROUP LINK.......//
export const GroupLinkSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number).or(z.number()),
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  list: SingleLinkSchema.array(),
});
export type GroupLinkType = z.infer<typeof GroupLinkSchema>;

//......MENU ZONE.......//
export const MenuZoneSchema = z
  .union([SingleLinkSchema, GroupLinkSchema])
  .array()
  .optional();
export type MenuZoneType = z.infer<typeof MenuZoneSchema>;

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
