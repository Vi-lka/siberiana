import { z } from "zod";

//.........................SITEINFO.........................//
export const SiteInfoDict = z.object({
  siteName: z.string(),
  siteDescription: z.string(),
});
export type SiteInfoDict = z.infer<typeof SiteInfoDict>;

//.........................BREADCRUMBS.........................//
export const BreadcrumbsDict = z.object({
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
export type BreadcrumbsDict = z.infer<typeof BreadcrumbsDict>;

//.........................PAGINATION.........................//
export const PaginationDict = z.object({
  showMore: z.string(),
  page: z.string(),
  of: z.string(),
  firstPage: z.string(),
  lastPage: z.string(),
  previousPage: z.string(),
  nextPage: z.string()
});
export type PaginationDict = z.infer<typeof PaginationDict>;

//.........................SORT.........................//
export const SortDict = z.object({
  placeholder: z.string(),
  asc: z.string(),
  desc: z.string(),
  ascText: z.string(),
  descText: z.string(),
  byName: z.string(),
  byAdded: z.string(),
  reset: z.string()
});
export type SortDict = z.infer<typeof SortDict>;

//.......SORTDATA.......//
export const SortData = z.object({
  val: z.string().optional(),
  text: z.string().optional(),
});
export type SortData = z.infer<typeof SortData>;

//.........................ERRORS.........................//
export const ErrorsDict = z.object({
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
export type ErrorsDict = z.infer<typeof ErrorsDict>;

//.........................MENU.........................//
//......MENU SINGLE LINK.......//
export const SingleLink = z.object({
  id: z.string().regex(/^\d+$/).transform(Number).or(z.number()),
  name: z.string(),
  url: z.string(),
  description: z.string().nullable().optional(),
  image: z.string().optional(),
});
export type SingleLink = z.infer<typeof SingleLink>;

//......MENU GROUP LINK.......//
export const GroupLink = z.object({
  id: z.string().regex(/^\d+$/).transform(Number).or(z.number()),
  name: z.string(),
  list: SingleLink.array(),
});
export type GroupLink = z.infer<typeof GroupLink>;

//......MENU ZONE.......//
export const MenuDict = z
  .union([SingleLink, GroupLink])
  .array();
export type MenuDict = z.infer<typeof MenuDict>;

//.........................SEARCH.........................//
export const SearchDict = z.object({
  error: z.string(),
  button: z.string(),
  placeholder: z.string(),
});
export type SearchDict = z.infer<typeof SearchDict>;

//.........................AUTH.........................//
export const AuthDict = z.object({
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
export type AuthDict = z.infer<typeof AuthDict>;

//.........................CATEGORIES.........................//
export const CategoriesDict = z.object({
  title: z.string(),
  textUrl: z.string(),
  goTo: z.string(),
});
export type CategoriesDict = z.infer<typeof CategoriesDict>;

//.........................FILTERS.........................//
export const FiltersDict = z.object({
  title: z.string(),
  categories: z.string(),
  collections: z.string(),
  countries: z.string(),
  regions: z.string(),
  cultures: z.string(),
  monuments: z.string(),
  techniques: z.string(),
});
export type FiltersDict = z.infer<typeof FiltersDict>;

//.........................OBJECTS.........................//
export const ObjectsDict = z.object({
  count: z.string(),
  filters: FiltersDict,
  artifacts: z.string(),
  books: z.string(),
  protectedAreaPictures: z.string()
});
export type ObjectsDict = z.infer<typeof ObjectsDict>;

//.........................QUIZ.........................//
export const QuizDict = z.object({
  right: z.string(),
  wrong: z.string(),
  tryAgain: z.string(),
});
export type QuizDict = z.infer<typeof QuizDict>;

//.........................ORGANIZATIONS.........................//
export const OrganizationsDict = z.object({
  title: z.string(),
  textUrl: z.string(),
  goTo: z.string(),
});
export type OrganizationsDict = z.infer<typeof OrganizationsDict>;

//.........................PROJECTS.........................//
export const ProjectsDict = z.object({
  title: z.string(),
  textUrl: z.string(),
  goTo: z.string(),
});
export type ProjectsDict = z.infer<typeof ProjectsDict>;

//.........................SERVICES.........................//
export const ServicesDict = z.object({
  title: z.string(),
  textUrl: z.string(),
  goTo: z.string(),
});
export type ServicesDict = z.infer<typeof ServicesDict>;

//.........................SCHEDULE.........................//
export const ScheduleDict = z.object({
  monday: z.string(),
  tuesday: z.string(),
  wednesday: z.string(),
  thursday: z.string(),
  friday: z.string(),
  saturday: z.string(),
  sunday: z.string(),
});
export type ScheduleDict = z.infer<typeof ScheduleDict>;

//.........................TOOLTIPS.........................//
export const TooltipsDict = z.object({
  consortium: z.string(),
});
export type TooltipsDict = z.infer<typeof TooltipsDict>;

//.........................ACCOUNT.........................//
export const AccountDict = z.object({
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
export type AccountDict = z.infer<typeof AccountDict>;

//.........................FAQ.........................//
export const FAQDict = z.object({
  title: z.string(),
  subTitle: z.string(),
  techSupport: z.string()
});
export type FAQDict = z.infer<typeof FAQDict>;

//.........................FOOTER.........................//
export const FooterDict = z.object({
  links: z.object({
    name: z.string(),
    url: z.string()
  }).array(),
  allRightRes: z.string(),
  privacyPol: z.string(),
  termsOfUse: z.string(),
});
export type FooterDict = z.infer<typeof FooterDict>;

//.........................DICTIONARY.........................//
export const Dictionary = z.object({
  siteInfo: SiteInfoDict,
  breadcrumbs: BreadcrumbsDict,
  pagination: PaginationDict,
  sort: SortDict,
  errors: ErrorsDict,
  menu: MenuDict,
  homeTitle: z.string(),
  search: SearchDict,
  auth: AuthDict,
  categories: CategoriesDict,
  objects: ObjectsDict,
  quiz: QuizDict,
  organizations: OrganizationsDict,
  projects: ProjectsDict,
  services: ServicesDict,
  schedule: ScheduleDict,
  tooltips: TooltipsDict,
  account: AccountDict,
  faq: FAQDict,
  footer: FooterDict,
});
export type Dictionary = z.infer<typeof Dictionary>;
