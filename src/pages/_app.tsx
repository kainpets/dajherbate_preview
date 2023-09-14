import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import NextNProgress from 'nextjs-progressbar';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Daj Herbate App</title>
        <meta name="description" content="Aplikacja Fundacji Daj Herbatę" lang="pl" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <NextNProgress />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
