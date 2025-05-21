import React from "react";
import ReactQueryProvider from "./components/react-query.provider";
import {
  NextIntlClientProvider,
  useLocale,
  useMessages,
  useNow,
  useTimeZone,
} from "next-intl";
import NextAuthProvider from "./components/next-auth.provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  // to ensure intl provider will have it on client side
  const messages = useMessages();
  const locale = useLocale();
  const now = useNow();
  const timezone = useTimeZone();

  return (
    <ReactQueryProvider>
      <NextAuthProvider>
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
          now={now}
          timeZone={timezone}
        >
          {children}
        </NextIntlClientProvider>
      </NextAuthProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
