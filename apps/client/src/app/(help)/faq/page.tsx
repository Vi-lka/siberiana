import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { Dictionary } from "@siberiana/schemas";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@siberiana/ui";

import ErrorHandler from "~/components/errors/ErrorHandler";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import { getFAQ } from "~/lib/queries/strapi-server";
import { getDictionary } from "~/lib/utils/getDictionary";

export default async function FAQ() {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const [dataResult] = await Promise.allSettled([getFAQ()]);
  if (dataResult.status === "rejected")
    return (
      <ErrorHandler
        error={dataResult.reason as unknown}
        place="FAQ"
        notFound
        goBack={false}
      />
    );

  return (
    <div>
      <Breadcrumbs dict={dictResult.breadcrumbs} />

      <div className="mx-auto mb-24 mt-10 w-full max-w-[1000px] md:w-3/4 lg:w-3/5">
        <div className="mb-14 mt-10">
          <h1 className="text-foreground mb-6 text-2xl font-bold uppercase lg:text-3xl">
            {dictResult.faq.title}
          </h1>
          <p className="inline text-sm lg:text-base">
            {dictResult.faq.subTitle}
            &nbsp;
            <Link
              href={`/tech-support`}
              target="_blank"
              className="underline underline-offset-4"
            >
              {dictResult.faq.techSupport}
            </Link>
          </p>
        </div>

        <div>
          {dataResult.value.category.map((category, index) => (
            <div key={index} className="mb-14">
              <h1 className="text-foreground mb-6 text-xl font-bold uppercase lg:text-2xl">
                {category.title}
              </h1>

              <Accordion type="single" collapsible className="w-full">
                {category.item.map((item, index) => (
                  <AccordionItem key={index} value={index.toString()}>
                    <AccordionTrigger className="text-left text-sm lg:text-base">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ReactMarkdown
                        className={"whitespace-pre-wrap"}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {item.answer}
                      </ReactMarkdown>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
