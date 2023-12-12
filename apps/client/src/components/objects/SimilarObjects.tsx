import type { ObjectsTypes } from "~/lib/queries/api-similar-objects";
import { getSimilar } from "~/lib/queries/api-similar-objects";
import ImgObject from "../thumbnails/ImgObject";

export default async function SimilarObjects({
  title,
  type,
  primaryImageURL,
  removeLastPath,
}: {
  title: string;
  type: ObjectsTypes;
  primaryImageURL: string;
  removeLastPath?: boolean;
}) {
  const similar = await getSimilar(type, primaryImageURL, removeLastPath);

  return (
    <div className="mb-20">
      <h1 className="text-foreground mb-10 text-xl font-bold uppercase lg:text-2xl">
        {title}
      </h1>
      <div className="flex flex-col gap-10 md:grid md:grid-cols-4 md:gap-4 xl:gap-10">
        {similar.map((img) => (
          <ImgObject
            href={img.id}
            key={img.id}
            src={img.primaryImageURL}
            title={img.displayName}
          />
        ))}
      </div>
    </div>
  );
}
