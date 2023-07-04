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
export const SearchDictSchema = z.object({
  error: z.string(),
  button: z.string(),
  placeholder: z.string(),
});
export type SearchDictType = z.infer<typeof SearchDictSchema>;

//......AUTH.......//
export const AuthDictSchema = z.object({
  mainButton: z.string(),
  logIn: z.string(),
  signUp: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  passwordConfirm: z.string(),
  ORCID: z.string(),
  regAs: z.string(),
  researcher: z.string(),
  personalData: z.string(),
  personalDataLinkText: z.string(),
  create: z.string(),
  or: z.string(),
  reset: z.string(),
  authButtons: z.object({
    google: z.string()
  }),
  errors: z.object({
    required: z.string(),
    email: z.string(),
    passwordMin: z.string(),
    passwordMatch: z.string()
  })
});
export type AuthDictType = z.infer<typeof AuthDictSchema>;


//.........................DICTIONARY.........................//
export const DictionarySchema = z.object({
  menu: MenuZoneSchema,
  auth: AuthDictSchema,
  homeTitle: z.string().max(100),
  search: SearchDictSchema, 
});
export type DictionaryType = z.infer<typeof DictionarySchema>;
