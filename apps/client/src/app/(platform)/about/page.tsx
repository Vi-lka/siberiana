import React from "react";
import { DictionarySchema } from "@siberiana/schemas";
import { getDictionary } from "~/lib/utils/getDictionary";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import { getAbout } from "~/lib/queries/strapi-server";
import ErrorHandler from "~/components/errors/ErrorHandler";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw";
import Member from "./Member";

export default async function About() {

  const dict = await getDictionary();
  const dictResult = DictionarySchema.parse(dict);

  const [ dataResult ] = await Promise.allSettled([ getAbout() ])
  if  (dataResult.status === 'rejected') return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="About" 
      notFound 
      goBack={false}
    />
  )

  return (
    <div>
        <Breadcrumbs dict={dictResult.breadcrumbs} />

        <div className="mt-10 mb-4 flex flex-col gap-10 max-w-[1600px] mx-auto">
            <div className="">
                <ReactMarkdown 
                    className={"whitespace-pre-wrap"} 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    transformImageUri={uri => `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${uri}`}
                >
                  {dataResult.value.description ? dataResult.value.description : ""}
                </ReactMarkdown>
            </div>

            <h1 className="text-foreground text-2xl font-bold uppercase">
                {dataResult.value.title}
            </h1>

            <div className="md:w-full w-[85%] mx-auto mb-24 grid md:grid-cols-4 grid-cols-1 gap-6">
                {dataResult.value.team.map((member, index) => (
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
