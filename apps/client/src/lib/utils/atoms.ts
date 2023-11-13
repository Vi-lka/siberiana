import "client-only";

import { atom } from "jotai";

export const tabAccountAtom = atom("favourites");
export const tabObjectsAtom = atom("artifacts");

export const artifactsCountAtom = atom(0);
export const booksCountAtom = atom(0);
export const PAPCountAtom = atom(0); // Protected Area Pictures
export const artsCountAtom = atom(0);