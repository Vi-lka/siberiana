import React from "react";
import { getSlider } from "~/lib/queries/strapi-server";
import HomeSlider from "./HomeSlider";
import ErrorHandler from "../errors/ErrorHandler";

export default async function HomeSliderServer() {
  const [ dataResult ] = await Promise.allSettled([ getSlider() ])
  if  (dataResult.status === 'rejected') return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Slider" 
      notFound={false}
    />
  )

  return (
    <HomeSlider data={dataResult.value} />
  );
}
