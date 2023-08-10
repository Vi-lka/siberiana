"use client"

import React from 'react'

export default function MapHtml({ map }: { map: string }) {
    const [mapHtml, setMapHtml] = React.useState<string>("")

    React.useEffect(() => {
        setMapHtml(map)
    }, [map])

    return (
      <div className="map-html flex lg:w-1/2 w-full min-h-[375px] rounded-xl overflow-hidden" dangerouslySetInnerHTML={{__html: mapHtml}}></div>
    )
}
