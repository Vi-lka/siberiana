import { DictionarySchema } from '@siberiana/schemas';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@siberiana/ui';
import Link from 'next/link';
import React from 'react'
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Breadcrumbs from '~/components/ui/Breadcrumbs';
import ErrorHandler from '~/components/errors/ErrorHandler';
import { getFAQ } from '~/lib/queries/strapi-server';
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function FAQ({
    params: { locale },
  }: {
    params: { locale: string },
}) {

    const dict = await getDictionary(locale);
    const dictResult = DictionarySchema.parse(dict);

    try {
      await getFAQ(locale);
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
  
    const dataResult = await getFAQ(locale);

  return (
    <div>
        <Breadcrumbs dict={dictResult.breadcrumbs} />

          <div className="mt-10 mb-24 lg:w-3/5 md:w-3/4 w-full mx-auto">
            <div className="mt-10 mb-14">
                <h1 className="text-foreground lg:text-3xl text-2xl font-bold uppercase mb-6">
                    {dictResult.faq.title}
                </h1>
                <p className="inline lg:text-base text-sm">
                  {dictResult.faq.subTitle} 
                  &nbsp;
                  <Link
                    href={`/${locale}/tech-support`}
                    target="_blank"
                    className="underline underline-offset-4"
                  >
                    {dictResult.faq.techSupport}
                  </Link> 
                </p>
            </div>

            <div>
              {dataResult.category.map((category, index) => (
                <div
                  key={index}
                  className="mb-14"
                >
                  <h1 className="text-foreground lg:text-2xl text-xl font-bold uppercase mb-6">
                    {category.title}
                  </h1>

                  <Accordion type="single" collapsible className="w-full">
                    {category.item.map((item, index) =>(
                      <AccordionItem key={index} value={index.toString()}>
                        <AccordionTrigger className='lg:text-base text-sm text-left'>{item.question}</AccordionTrigger>
                        <AccordionContent>
                          <ReactMarkdown 
                            className={"whitespace-pre-wrap"} 
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            transformImageUri={uri => `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${uri}`}
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
  )
}
