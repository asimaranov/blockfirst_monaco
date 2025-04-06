import '~/styles/globals.css';

import { type Metadata } from 'next';
import { lato, roboto, delight } from './fonts';

import { TRPCReactProvider } from '~/trpc/react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Blockfirst - образовательная блокчейн платформа',
  description:
    'Начните свой путь в web3 с помощью специально разработанной платформы и персонального AI-ментора ',
  icons: [{ rel: 'icon', type: 'image/png', url: '/icon.png' }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${lato.variable} ${roboto.variable} ${delight.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        <TRPCReactProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
