import "client-only"

import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const tabAccountAtom = atomWithStorage('tab', "favourites")
export const tabObjectsAtom = atomWithStorage("tabObject", "artifacts")

export const artifactsCountAtom = atom(0) 
export const booksCountAtom = atom(0)
export const PAPCountAtom = atom(0) // Protected Area Pictures