"use client";

import { divIcon } from "leaflet";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { parse } from "wellknown";

import type { PAPById } from "@siberiana/schemas";
import { Button, Dialog, DialogContent, DialogTrigger } from "@siberiana/ui";

import "leaflet/dist/leaflet.css";

import Image from "next/image";
import { useProtectedAreaPoints } from "~/lib/queries/api-client";

export default function ShowOnMap({ data }: { data: PAPById }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-Inter hover:bg-beaver hover:text-beaverLight dark:bg-accent dark:text-beaverLight dark:hover:text-darkBlue dark:hover:bg-beaverLight mt-10 w-full rounded-3xl px-3 py-6 text-xs font-normal uppercase md:w-auto md:px-10 md:py-6 xl:text-sm">
          Показать на карте
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-accent h-[90vh] max-w-[95vw] overflow-hidden p-0 sm:max-w-[95vw]">
        <div className="align-center flex h-full w-full justify-center py-12">
          <Map data={data} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

const Map = ({ data }: { data: PAPById }) => {
  const { data: protectedArea } = useProtectedAreaPoints(
    data.protectedArea?.id,
  );

  const points = useMemo(() => {
    if (!protectedArea) {
      return null;
    }

    const pictures =
      protectedArea?.protectedAreas?.edges?.at(0)?.node?.protectedAreaPictures;

    if (!pictures) {
      return null;
    }

    return pictures.reduce((acc: ReactNode[], p) => {
      if (!p.geometry) {
        return acc;
      }

      const geojson = parse(p.geometry);

      if (
        !geojson ||
        geojson?.type !== "Point" ||
        geojson?.coordinates?.length !== 2
      ) {
        return acc;
      }

      acc.push(
        <Marker
          key={p.id}
          position={geojson.coordinates}
          zIndexOffset={p.id === data.id ? 999 : 1}
          icon={divIcon({
            html: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="${
                  p.id === data.id ? "#FF4560" : "#888888"
                }" viewBox="0 0 527.678 527.678">
	                <g>
		                <path d="M263.877,0C169.782,0,93.512,76.271,93.512,170.213c0,93.941,159.197,349.834,159.197,349.834
			                c6.196,10.175,16.217,10.175,22.338,0c0,0,159.119-255.816,159.119-349.834C434.166,76.194,357.973,0,263.877,0z M263.877,264.537
			                c-61.583,0-111.384-49.878-111.384-111.384c0-61.506,49.801-111.461,111.384-111.461c61.582,0,111.384,49.878,111.384,111.384
			                S325.459,264.537,263.877,264.537z"/>
		                <ellipse cx="263.877" cy="153.153" rx="69.844" ry="69.844"/>
	                </g>
                </svg>
            `,
            className: "",
            iconSize: [32, 32],
          })}
        >
          <Popup maxWidth={300} minWidth={300}>
            <div className="mx-auto w-full">
              <h1 className="text-xl font-bold">{p.displayName}</h1>
              {p.primaryImageURL && (
                <Image
                  src={p.primaryImageURL}
                  placeholder="blur"
                  blurDataURL="/images/image-placeholder.png"
                  width={300}
                  height={300}
                  className="mx-auto w-full overflow-hidden object-contain"
                  alt={p.displayName}
                />
              )}
              <p className="font-Inter text-sm">{p.description}</p>
            </div>
          </Popup>
        </Marker>,
      );

      return acc;
    }, []);
  }, [protectedArea, data.id]);

  const geojson = data.geometry ? parse(data.geometry) : null;

  return (
    <MapContainer
      center={geojson?.type === "Point" ? geojson.coordinates : [0, 0]}
      zoom={15}
      attributionControl={false}
      preferCanvas={true}
      className="h-full w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {points}
    </MapContainer>
  );
};
