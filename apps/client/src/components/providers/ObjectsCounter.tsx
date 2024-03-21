"use client";

import React from "react";
import { useSetAtom } from "jotai";

import {
  artifactsCountAtom,
  artsCountAtom,
  booksCountAtom,
  dendroCountAtom,
  herbariumsCountAtom,
  PAPCountAtom,
} from "~/lib/utils/atoms";

export default function ObjectsCounter({
  artifactsCount,
  booksCount,
  PAPCount,
  artsCount,
  herbariumsCount,
  dendroCount,
}: {
  artifactsCount?: number;
  booksCount?: number;
  PAPCount?: number;
  artsCount?: number;
  herbariumsCount?: number;
  dendroCount?: number;
}) {
  const setArtifactsCount = useSetAtom(artifactsCountAtom);
  const setBooksCount = useSetAtom(booksCountAtom);
  const setPAPCount = useSetAtom(PAPCountAtom);
  const setArtsCount = useSetAtom(artsCountAtom);
  const setHerbariumsCount = useSetAtom(herbariumsCountAtom);
  const setDendroCount = useSetAtom(dendroCountAtom);

  React.useEffect(() => {
    if (artifactsCount !== undefined) {
      setArtifactsCount(artifactsCount);
    }
  }, [artifactsCount, setArtifactsCount]);

  React.useEffect(() => {
    if (booksCount !== undefined) {
      setBooksCount(booksCount);
    }
  }, [booksCount, setBooksCount]);

  React.useEffect(() => {
    if (PAPCount !== undefined) {
      setPAPCount(PAPCount);
    }
  }, [PAPCount, setPAPCount]);

  React.useEffect(() => {
    if (artsCount !== undefined) {
      setArtsCount(artsCount);
    }
  }, [artsCount, setArtsCount]);

  React.useEffect(() => {
    if (herbariumsCount !== undefined) {
      setHerbariumsCount(herbariumsCount);
    }
  }, [herbariumsCount, setHerbariumsCount]);

  React.useEffect(() => {
    if (dendroCount !== undefined) {
      setDendroCount(dendroCount);
    }
  }, [dendroCount, setDendroCount]);

  return null;
}
