import React from 'react'
import HomeSlider from './HomeSlider'
import { getSlider } from '~/lib/queries/strapi-server';

export default async function HomeSliderServer() {

    const slider = await getSlider();

  return (
    <HomeSlider data={slider} />
  )
}
