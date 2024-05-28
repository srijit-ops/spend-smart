import RootLayout from "@/components/layout/RootLayout";
import ToastLayout from "@/components/layout/ToastLayout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  router,
  pageProps: { session, ...pageProps },
}) {
  const routesWithCustomLayout = [
    "/expense-overview",
    "/allTransactions",
    "/transactionDetails",
  ];
  const isRouteWithCustomLayout = routesWithCustomLayout.includes(
    router.pathname
  );

  return (
    <SessionProvider session={session}>
      {isRouteWithCustomLayout ? (
        <RootLayout>
          <ToastLayout>
            <Component {...pageProps} />
          </ToastLayout>
        </RootLayout>
      ) : (
        <>
          <ToastLayout>
            <Component {...pageProps} />
          </ToastLayout>
        </>
      )}
    </SessionProvider>
  );
}
