import { z } from "zod";

//.........................BREADCRUMBS.........................//
export const BreadcrumbsDictSchema = z.object({
  home: z.string(),
  organizations: z.string(),
  objects: z.string(),
  archaeological: z.string(),
  archaeology: z.string(),
});
export type BreadcrumbsDictType = z.infer<typeof BreadcrumbsDictSchema>;

//.........................ERRORS.........................//
export const ErrorsDictSchema = z.object({
  title: z.string(),
  tryAgain: z.string(),
});
export type ErrorsDictType = z.infer<typeof ErrorsDictSchema>;

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
  .array();
export type MenuZoneType = z.infer<typeof MenuZoneSchema>;

//.........................SEARCH.........................//
export const SearchDictSchema = z.object({
  error: z.string(),
  button: z.string(),
  placeholder: z.string(),
});
export type SearchDictType = z.infer<typeof SearchDictSchema>;

//.........................AUTH.........................//
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
    google: z.string(),
  }),
  errors: z.object({
    required: z.string(),
    email: z.string(),
    passwordMin: z.string(),
    passwordMatch: z.string(),
  }),
});
export type AuthDictType = z.infer<typeof AuthDictSchema>;

//.........................CATEGORIES.........................//
export const CategorySchema = z.object({
  title: z.string(),
  url: z.string(),
  img: z.string(),
});
export type CategoryType = z.infer<typeof CategorySchema>;

export const CategoriesSchema = z.object({
  title: z.string(),
  list: CategorySchema.array(),
});
export type CategoriesType = z.infer<typeof CategoriesSchema>;

//.........................QUIZ.........................//
export const QuizSchema = z.object({
  right: z.string(),
  wrong: z.string(),
  tryAgain: z.string(),
});
export type QuizType = z.infer<typeof QuizSchema>;

//.........................ORGANIZATIONS.........................//
export const OrganizationsDictSchema = z.object({
  title: z.string(),
  url: z.string(),
  textUrl: z.string(),
});
export type OrganizationsDictType = z.infer<typeof OrganizationsDictSchema>;

//.........................DICTIONARY.........................//
export const DictionarySchema = z.object({
  breadcrumbs: BreadcrumbsDictSchema,
  errors: ErrorsDictSchema,
  menu: MenuZoneSchema,
  auth: AuthDictSchema,
  homeTitle: z.string().max(100),
  search: SearchDictSchema,
  categories: CategoriesSchema,
  quiz: QuizSchema,
  organizations: OrganizationsDictSchema,
});
export type DictionaryType = z.infer<typeof DictionarySchema>;
