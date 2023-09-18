import "./globals.css";
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import { Toaster } from "@siberiana/ui";
import Header from "~/components/header/Header";
import Footer from "~/components/Footer";
import { getDictionary } from "~/lib/utils/getDictionary";
import Providers from "~/components/providers/Providers";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--Inter",
  // Fix font load errors: https://github.com/vercel/next.js/issues/45080#issuecomment-1646678980
  preload: false,
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--OpenSans",
  // Fix font load errors: https://github.com/vercel/next.js/issues/45080#issuecomment-1646678980
  preload: false,
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
      </body>
    </html>
  );
}
