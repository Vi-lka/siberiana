import { z } from "zod";

//.........................SITEINFO.........................//
export const SiteInfoSchema = z.object({
  siteName: z.string(),
  siteDescription: z.string(),
});
export type SiteInfoType = z.infer<typeof SiteInfoSchema>;

//.........................BREADCRUMBS.........................//
export const BreadcrumbsDictSchema = z.object({
  home: z.string(),
  categories: z.string(),
  collections: z.string(),
  objects: z.string(),
  organizations: z.string(),
  projects: z.string(),
  services: z.string(),
  about: z.string(),
  account: z.string(),
  settings: z.string(),
  faq: z.string(),
});
export type BreadcrumbsDictType = z.infer<typeof BreadcrumbsDictSchema>;

//.........................PAGINATION.........................//
export const PaginationDictSchema = z.object({
  showMore: z.string(),
  page: z.string(),
  of: z.string(),
  firstPage: z.string(),
  lastPage: z.string(),
  previousPage: z.string(),
  nextPage: z.string()
});
export type PaginationDictType = z.infer<typeof PaginationDictSchema>;

//.........................SORT.........................//
export const SortDictSchema = z.object({
  placeholder: z.string(),
  asc: z.string(),
  desc: z.string(),
  ascText: z.string(),
  descText: z.string(),
  byName: z.string(),
  byAdded: z.string(),
  reset: z.string()
});
export type SortDictType = z.infer<typeof SortDictSchema>;

//.......SORTDATA.......//
export const SortDataSchema = z.object({
  val: z.string().optional(),
  text: z.string().optional(),
});
export type SortDataType = z.infer<typeof SortDataSchema>;

//.........................ERRORS.........................//
export const ErrorsDictSchema = z.object({
  title: z.string(),
  tryAgain: z.string(),
  notFound: z.object({
    title: z.string(),
    description: z.string(),
    goBack: z.string()
  }),
  sessionTitle: z.string(),
  sessionDescription: z.string()
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
export const MenuDictSchema = z
  .union([SingleLinkSchema, GroupLinkSchema])
  .array();
export type MenuDictType = z.infer<typeof MenuDictSchema>;

//.........................SEARCH.........................//
export const SearchDictSchema = z.object({
  error: z.string(),
  button: z.string(),
  placeholder: z.string(),
});
export type SearchDictType = z.infer<typeof SearchDictSchema>;

//.........................AUTH.........................//
export const AuthDictSchema = z.object({
  signIn: z.string(),
  signOut: z.string(),
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
export const CategoriesDictSchema = z.object({
  title: z.string(),
  textUrl: z.string(),
  goTo: z.string(),
});
export type CategoriesDictType = z.infer<typeof CategoriesDictSchema>;

//.........................OBJECTS.........................//
export const ObjectsDictSchema = z.object({
  count: z.string(),
  filters: z.string(),
  artifacts: z.string(),
  books: z.string(),
  protectedAreaPictures: z.string()
});
export type ObjectsDictType = z.infer<typeof ObjectsDictSchema>;

//.........................QUIZ.........................//
export const QuizDictSchema = z.object({
  right: z.string(),
  wrong: z.string(),
  tryAgain: z.string(),
});
export type QuizDictType = z.infer<typeof QuizDictSchema>;

//.........................ORGANIZATIONS.........................//
export const OrganizationsDictSchema = z.object({
  title: z.string(),
  textUrl: z.string(),
  goTo: z.string(),
});
export type OrganizationsDictType = z.infer<typeof OrganizationsDictSchema>;

//.........................PROJECTS.........................//
export const ProjectsDictSchema = z.object({
  title: z.string(),
  textUrl: z.string(),
  goTo: z.string(),
});
export type ProjectsDictType = z.infer<typeof ProjectsDictSchema>;

//.........................SERVICES.........................//
export const ServicesDictSchema = z.object({
  title: z.string(),
  textUrl: z.string(),
  goTo: z.string(),
});
export type ServicesDictType = z.infer<typeof ServicesDictSchema>;

//.........................SCHEDULE.........................//
export const ScheduleDictSchema = z.object({
  monday: z.string(),
  tuesday: z.string(),
  wednesday: z.string(),
  thursday: z.string(),
  friday: z.string(),
  saturday: z.string(),
  sunday: z.string(),
});
export type ScheduleDictType = z.infer<typeof ScheduleDictSchema>;

//.........................TOOLTIPS.........................//
export const TooltipsDictSchema = z.object({
  consortium: z.string(),
});
export type TooltipsDictType = z.infer<typeof TooltipsDictSchema>;

//.........................ACCOUNT.........................//
export const AccountDictSchema = z.object({
  barTitle: z.string(),
  profile: z.string(),
  settings: z.string(),
  favourites: z.string(),
  collections: z.string(),
  publications: z.string(),
  signOut: z.string(),
  roles: z.object({
    admin: z.string(),
    research: z.string(),
    moder: z.string()
  })
});
export type AccountDictType = z.infer<typeof AccountDictSchema>;

//.........................FAQ.........................//
export const FAQDictSchema = z.object({
  title: z.string(),
  subTitle: z.string(),
  techSupport: z.string()
});
export type FAQDictType = z.infer<typeof FAQDictSchema>;

//.........................FOOTER.........................//
export const FooterDictSchema = z.object({
  links: z.object({
    name: z.string(),
    url: z.string()
  }).array(),
  allRightRes: z.string(),
  privacyPol: z.string(),
  termsOfUse: z.string(),
});
export type FooterDictType = z.infer<typeof FooterDictSchema>;

//.........................DICTIONARY.........................//
export const DictionarySchema = z.object({
  siteInfo: SiteInfoSchema,
  breadcrumbs: BreadcrumbsDictSchema,
  pagination: PaginationDictSchema,
  sort: SortDictSchema,
  errors: ErrorsDictSchema,
  menu: MenuDictSchema,
  homeTitle: z.string().max(100),
  search: SearchDictSchema,
  auth: AuthDictSchema,
  categories: CategoriesDictSchema,
  objects: ObjectsDictSchema,
  quiz: QuizDictSchema,
  organizations: OrganizationsDictSchema,
  projects: ProjectsDictSchema,
  services: ServicesDictSchema,
  schedule: ScheduleDictSchema,
  tooltips: TooltipsDictSchema,
  account: AccountDictSchema,
  faq: FAQDictSchema,
  footer: FooterDictSchema,
});
export type DictionaryType = z.infer<typeof DictionarySchema>;
