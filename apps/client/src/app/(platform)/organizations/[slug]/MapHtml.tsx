"use client";

import React from "react";

export default function MapHtml({ map }: { map: string }) {
  const [mapHtml, setMapHtml] = React.useState<string>("");

  React.useEffect(() => {
    setMapHtml(map);
  }, [map]);

  return (
    <div
      className="map-html flex min-h-[375px] w-full overflow-hidden rounded-xl lg:w-1/2"
      dangerouslySetInnerHTML={{ __html: mapHtml }}
    ></div>
  );
}
