/* eslint-disable @next/next/no-img-element */
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import { Toaster } from "@siberiana/ui";
import Header from "~/components/header/Header";
import Footer from "~/components/Footer";
import { getDictionary } from "~/lib/utils/getDictionary";
import Providers from "~/components/providers/Providers";
import Script from "next/script";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--Inter",
  // Fix font load errors: https://github.com/vercel/next.js/issues/45080#issuecomment-1646678980
  preload: false,
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--OpenSans",
  // Fix font load errors: https://github.com/vercel/next.js/issues/45080#issuecomment-1646678980
  preload: false,
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {

  // fetch data
  const dict = await getDictionary();

  return {
    title: {
      default: dict.siteInfo.siteName,
      template: `%s | ${dict.siteInfo.siteName}`,
    },
    description: dict.siteInfo.siteDescription,
    openGraph: {
      title: dict.siteInfo.siteName,
      description: dict.siteInfo.siteDescription,
      url: process.env.NEXT_PUBLIC_URL,
      siteName: dict.siteInfo.siteName,
      images: ['/images/image-placeholder.png'],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang={"ru"}
      suppressHydrationWarning
      className={`${inter.variable} ${openSans.variable}`}
    >
      <body className="m min-h-screen m-0 flex flex-col">
        <Providers>
          <Header />
          <main className="pt-20 flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
        <Toaster />
        <Script
          id="ymetrika"
          dangerouslySetInnerHTML={{
            __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(92475151, "init", {
                 clickmap:true,
                 trackLinks:true,
                 accurateTrackBounce:true,
                 webvisor:true
            });`,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/92475151"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
              width={1}
              height={1}
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
