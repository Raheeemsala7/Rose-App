import { Toaster } from "sonner"
import ReactQueryProvider from "./_components/react-query-provider"
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from "./_components/theme-provider";
import NextAuthProvider from "./_components/next-auth-provider";



export const Providers = ({ children, locale }: { children: React.ReactNode, locale: string }) => {
    return (
        <ReactQueryProvider>
            {/* React Query Devtools  */}
            {/* <TanStackDevtools config={{ defaultOpen: false }} /> */}
            <NextIntlClientProvider>
                <ThemeProvider>
                    <NextAuthProvider>{children}</NextAuthProvider>
                </ThemeProvider>
            </NextIntlClientProvider>
        </ReactQueryProvider>
    )
}