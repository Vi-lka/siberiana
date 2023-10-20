import "./globals.css";
import { Inter, Open_Sans } from "next/font/google";
import { Toaster } from "@siberiana/ui";
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
          <main className="pt-20 flex-1">
            {children}
          </main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
