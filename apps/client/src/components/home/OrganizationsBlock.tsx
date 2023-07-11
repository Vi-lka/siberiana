import { OrganizationsSchema } from '@siberiana/schemas';
import React from 'react'
import { getOrganizations } from '~/lib/queries/strapi-server'
import ImgTextOn from '../thumbnails/ImgTextOn';

export default async function OrganizationsBlock({ locale }: { locale: string }) {

  const data = await getOrganizations(locale)

  const dataResult = OrganizationsSchema.parse(data);  

  function handleClassName(index: number) {
    switch (index) {
        case 0:
            return "md:row-span-1 md:col-span-2 md:aspect-auto aspect-square row-span-1 col-span-1";
        
        case 1:
            return "md:row-span-1 md:col-span-1 md:aspect-auto aspect-square row-span-1 col-span-1";

        case 2:
            return "md:row-span-2 md:col-span-1 md:aspect-auto aspect-square row-span-1 col-span-1";

        case 3:
            return "md:row-span-1 md:col-span-1 md:aspect-auto aspect-square row-span-1 col-span-1";

        case 4:
            return "md:row-span-1 md:col-span-2 md:aspect-auto aspect-square row-span-1 col-span-1";
    
        default:
            break;
    }
  }

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-4 md:grid-rows-2 grid-cols-1 grid-rows-5 gap-6 md:aspect-[4/2] aspect-auto">
        {dataResult.map((org, index) => 
            <ImgTextOn 
                key={index}
                className={handleClassName(index)}
                title={org.attributes.title}
                src={org.attributes.image.data?.attributes.url}
                url={`/organizations/${org.attributes.slug}`}
                origin={"strapi"}
                width={450}
                height={450}
            />
        )}
    </div>
  )
}
