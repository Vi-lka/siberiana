import "./globals.css";
import { Inter, Open_Sans } from "next/font/google";
import { Toaster } from "@siberiana/ui";
import Providers from "~/components/providers/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NoSession from "~/components/errors/NoSession";
import LogoSvg from "~/components/LogoSvg";
import Header from "~/components/header/Header";
import MenuBar from "~/components/MenuBar/MenuBar";
import type { Metadata } from "next";
import { ClientHydration } from "~/components/providers/ClientHydration";

export const metadata: Metadata = {
  title:{
    template: '%s | Сибириана-Admin',
    default: 'Сибириана-Admin'
  },
}

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);

  const roles = session?.user.roles

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
            {!!session && ((roles?.includes("administrator") || roles?.includes("moderator"))) 
              ? children
              : (
                <div className="flex flex-col justify-center items-center gap-6 h-[70dvh]">
                  <div className="">
                    <LogoSvg className="h-[5.5rem] w-[15rem] md:h-[7rem] md:w-[19rem]" />
                  </div>
                  <NoSession alert={!!session && !(roles?.includes("administrator") || roles?.includes("moderator"))} />
                </div>
              )
            }
          </main>
          {!!session && ((roles?.includes("administrator") || roles?.includes("moderator"))) 
            ? (
              <ClientHydration>
                <MenuBar />                
              </ClientHydration>
            )
            : null 
          }
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
