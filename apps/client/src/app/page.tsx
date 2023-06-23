
import { Button } from "@siberiana/ui";
import { ProjectSchema } from "@siberiana/schemas";
import type { ProjectType } from "@siberiana/schemas";
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { getProjects } from "~/lib/queries/strapi-api";
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw";

// Если runtime = 'nodejs' (по дефолту), при билде получаем [TypeError: fetch failed], [https://github.com/vercel/next.js/issues/44062]
// если указать имя контейнера NEXT_PUBLIC_STRAPI_API_URL=http://siberiana-strapi:1337 - errno: -3008, code: 'ENOTFOUND',
// если указать IP внешний NEXT_PUBLIC_STRAPI_API_URL=http://127.0.0.1:1337 - errno: -111, code: 'ECONNREFUSED', - localhost тоже не подходит
// если указать IP внутренний NEXT_PUBLIC_STRAPI_API_URL=http://172.18.0.3:1337 - cause: ConnectTimeoutError: Connect Timeout Error
// Возможно проблема в fetch() nodejs выше 16-ой версии
export const runtime = 'edge'

export default async function Home() {

  const projects = await getProjects()

  ProjectSchema.array().parse(projects)

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-beaver w-fit">@siberiana/client</h1>

      <Button className="bg-beaverLight hover:bg-beaver text-graphite hover:text-beaverLight mt-6 w-fit rounded-full uppercase">
        Button
      </Button>

      {projects && projects.map((project: ProjectType ) => (
        <div key={project.id} className="mb-20 bg-slate-400">
          <h1>{project.attributes?.Name}</h1>
          <ReactMarkdown 
            className={"whitespace-pre-wrap"} 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {project.attributes?.Content ? 
              project.attributes?.Content
              :
              ""
            }
          </ReactMarkdown>

          {
            project.attributes.Image.data &&
            <Image
              src={project.attributes.Image.data.attributes.url}
              width={500}
              height={500}
              alt="Picture of the author"
            />
          }
        </div>
      ))}
    </main>
  );
}