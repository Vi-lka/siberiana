import { DictionarySchema } from "@siberiana/schemas";
import { ZodError } from "zod";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import ErrorToast from "~/components/ui/ErrorToast";
import { getOrganizationBySlug } from "~/lib/queries/strapi-server";
import { getDictionary } from "~/lib/utils/getDictionary";

// export const runtime = "edge";

export default async function Organization({
    params: { locale, slug },
  }: {
    params: { locale: string, slug: string };
}) {
    const dict = await getDictionary(locale);
    const dictResult = DictionarySchema.parse(dict);

    try {
        await getOrganizationBySlug(slug);
      } catch (error) {
        if (error instanceof ZodError) {
          console.log(error.issues);
          return <ErrorToast dict={dictResult.errors} error={error.issues} />;
        } else {
          return (
            <ErrorToast dict={dictResult.errors} error={(error as Error).message} />
          );
        }
      }
    
      const dataResult = await getOrganizationBySlug(slug);
    
    return (
        <>
            <Breadcrumbs dict={dictResult.breadcrumbs} data={dataResult} />
            Organization: {slug}
        </>
    );
}