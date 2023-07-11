import React from 'react'
import HomeSlider from './HomeSlider'
import { getSlider } from '~/lib/queries/strapi-server';
import { SliderSchema } from '@siberiana/schemas';

export default async function HomeSliderServer() {

  const slider = await getSlider();
  const dataResult = SliderSchema.parse(slider);

  return (
    <HomeSlider data={dataResult} />
  )
}
