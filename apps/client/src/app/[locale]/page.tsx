import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { ProjectSchema } from "@siberiana/schemas";
import type { ProjectType } from "@siberiana/schemas";
import { Button } from "@siberiana/ui";

import { getProjects } from "~/lib/queries/strapi-api";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const projects = await getProjects(locale);

  ProjectSchema.array().parse(projects);

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-beaver w-fit">@siberiana/client</h1>

      <Button className="bg-beaverLight hover:bg-beaver text-graphite hover:text-beaverLight mt-6 w-fit rounded-full uppercase">
        Button
      </Button>

      <p>Current locale: {locale}</p>

      {projects &&
        projects.map((project: ProjectType) => (
          <div key={project.id} className="mb-20 bg-slate-400">
            <h1>{project.attributes?.Name}</h1>
            <ReactMarkdown
              className={"whitespace-pre-wrap"}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {project.attributes?.Content ? project.attributes?.Content : ""}
            </ReactMarkdown>

            {project.attributes.Image.data && (
              <Image
                src={project.attributes.Image.data.attributes.url}
                width={500}
                height={500}
                alt="Picture of the author"
              />
            )}
          </div>
        ))}
    </main>
  );
}
