import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { Dictionary } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import { getAbout } from "~/lib/queries/strapi-server";
import { getDictionary } from "~/lib/utils/getDictionary";
import Member from "./Member";

export default async function About() {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const [dataResult] = await Promise.allSettled([getAbout()]);
  if (dataResult.status === "rejected")
    return (
      <ErrorHandler
        error={dataResult.reason as unknown}
        place="About"
        notFound
        goBack={false}
      />
    );

  return (
    <div>
      <Breadcrumbs dict={dictResult.breadcrumbs} />

      <div className="mx-auto mb-4 mt-10 flex max-w-[2000px] flex-col gap-10">
        <div className="">
          <ReactMarkdown
            className={"whitespace-pre-wrap"}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {dataResult.value.description ? dataResult.value.description : ""}
          </ReactMarkdown>
        </div>

        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dataResult.value.title}
        </h1>

        <div className="mx-auto mb-24 grid w-[85%] grid-cols-1 gap-6 md:w-full md:grid-cols-4">
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
