import "../globals.css";
import { Bebas_Neue, Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { NextIntlClientProvider } from "next-intl";
import { BusinessSignUpProvider } from "@/infrastructure/context/business-signup.context";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={`${bebas.variable} ${inter.variable}`}>
      <body>
        <AppRouterCacheProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <BusinessSignUpProvider>{children}</BusinessSignUpProvider>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
