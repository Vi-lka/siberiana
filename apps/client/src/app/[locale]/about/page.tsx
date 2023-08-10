import React from "react";
import { DictionarySchema } from "@siberiana/schemas";
import { getDictionary } from "~/lib/utils/getDictionary";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import { getAbout } from "~/lib/queries/strapi-server";
import ErrorHandler from "~/components/ui/ErrorHandler";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw";
import Member from "./Member";

export default async function About({
  params: { locale },
}: {
  params: { locale: string },
}) {

  const dict = await getDictionary(locale);
  const dictResult = DictionarySchema.parse(dict);

  try {
    await getAbout(locale);
  } catch (error) {
    return (
      <ErrorHandler 
        locale={locale} 
        error={error} 
        place="Projects" 
        notFound 
        goBack={false}
      />
    )
  }

  const dataResult = await getAbout(locale);

  return (
    <div>
        <Breadcrumbs dict={dictResult.breadcrumbs} />

        <div className="mt-10 mb-4 flex flex-col gap-10">
            <div className="">
                <ReactMarkdown 
                    className={"whitespace-pre-wrap"} 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    transformImageUri={uri => `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${uri}`}
                >
                  {dataResult.description ? dataResult.description : ""}
                </ReactMarkdown>
            </div>

            <h1 className="text-foreground text-2xl font-bold uppercase">
                {dataResult.title}
            </h1>

            <div className="md:w-full w-[85%] mx-auto mb-24 grid md:grid-cols-4 grid-cols-1 gap-6">
                {dataResult.team.map((member, index) => (
                    <Member 
                        key={index}
                        title={member.name}
                        description={member.description}
                        src={member.image.data?.attributes.url}
                    />
                ))}
            </div>
        </div>

    </div>
  );
}
