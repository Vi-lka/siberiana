import { z } from "zod";
import { BookById, StatusEnum } from "../objects-schema";
import { ImageFile, LocationEnum } from "./global";

//.........................BOOKS.........................//
export const BooksArray = z.object({
  totalCount: z.number(),
  edges: z
    .object({
      node: BookById,
    })
    .array(),
});
export type BooksArray = z.infer<typeof BooksArray>;

export const BookForTable = z.object({
  id: z.string(),
  status: z.object({
    id: StatusEnum,
    displayName: z.string(),
  }),
  displayName: z.string().min(1),
  primaryImage: z.object({
    file: ImageFile.nullable().optional(),
    url: z.string(),
  }),
  description: z.string().optional(),
  externalLink: z.union([z.literal(""), z.string().trim().url()]).optional(),
  year: z.number().optional(),
  files: z.string().array(),
  collection: z.object({
    id: z.string(),
    displayName: z.string(),
  }),
  bookGenres: z.object({
    id: z.string(),
    displayName: z.string(),
  }).array(),
  authors: z.object({
    id: z.string(),
    displayName: z.string(),
  }).array(),
  periodical: z.object({
    id: z.string(),
    displayName: z.string(),
  }).nullable(),
  publisher: z.object({
    id: z.string(),
    displayName: z.string(),
  }).nullable(),
  license: z.object({
    id: z.string(),
    displayName: z.string(),
  }).nullable(),
  library: z.object({
    id: z.string(),
    displayName: z.string(),
  }).nullable(),
  location: z.object({
    id: z.string(),
    displayName: z.string(),
    type: LocationEnum,
  }).nullable(),
  createdBy: z.string().optional(),
  createdAt: z.date().optional(),
  updatedBy: z.string().optional(),
  updatedAt: z.date().optional(),
});
export type BookForTable = z.infer<typeof BookForTable>;

export const BooksForm = z.object({
  books: BookForTable.array(),
});
export type BooksForm = z.infer<typeof BooksForm>;

