import "client-only";

import type { CollectionsEnum } from "@siberiana/schemas";

import { atom } from "jotai";

export const tabAccountAtom = atom("favourites");
export const tabObjectsAtom = atom<CollectionsEnum>("artifacts");

export const artifactsCountAtom = atom(0);
export const booksCountAtom = atom(0);
export const PAPCountAtom = atom(0); // Protected Area Pictures
export const artsCountAtom = atom(0);
export const herbariumsCountAtom = atom(0);
