import Link from "next/link";

import { Dictionary } from "@siberiana/schemas";

import FeedbackForm from "~/components/techSupport/FeedbackForm";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import { getDictionary } from "~/lib/utils/getDictionary";

export default async function TechSupport() {
/*   const session = await getServerSession(authOptions);
  if (!session) return <NoSession />; */

  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  return (
    <div>
      <Breadcrumbs dict={dictResult.breadcrumbs} />

      <div className="mx-auto mb-24 mt-10 w-full max-w-[1000px] md:w-3/4 lg:w-3/5">
        <div className="mb-14 mt-10">
          <h1 className="text-foreground mb-6 text-2xl font-bold uppercase lg:text-3xl">
            {dictResult.techSupport.title}
          </h1>
          <p className="inline text-sm lg:text-base">
            {dictResult.techSupport.subTitle.split("$1")[0]}
            &nbsp;
            <Link
              href={`/faq`}
              target="_blank"
              className="underline underline-offset-4"
            >
              {dictResult.techSupport.faqLink}
            </Link>
            {dictResult.techSupport.subTitle.split("$1")[1]}
          </p>
        </div>

        <div>
          <FeedbackForm dict={dictResult.techSupport} />
        </div>
      </div>
    </div>
  );
}
