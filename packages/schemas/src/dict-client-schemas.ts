import { z } from "zod";

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

//......SEARCH.......//
export const SearchSchema = z.object({
  error: z.string(),
  button: z.string(),
  placeholder: z.string(),
});
export type SearchType = z.infer<typeof SearchSchema>;

//.........................DICTIONARY.........................//
export const DictionarySchema = z.object({
  menu: MenuZoneSchema,
  loginButton: z.string().max(10),
  homeTitle: z.string().max(100),
  search: SearchSchema,
});
export type DictionaryType = z.infer<typeof DictionarySchema>;
