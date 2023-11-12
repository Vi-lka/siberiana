import React from "react";

import { getSlider } from "~/lib/queries/strapi-server";
import ErrorHandler from "../errors/ErrorHandler";
import HomeSlider from "./HomeSlider";

export default async function HomeSliderServer() {
  const [dataResult] = await Promise.allSettled([getSlider()]);
  if (dataResult.status === "rejected")
    return (
      <ErrorHandler
        error={dataResult.reason as unknown}
        place="Slider"
        notFound={false}
      />
    );

  return <HomeSlider data={dataResult.value} />;
}
