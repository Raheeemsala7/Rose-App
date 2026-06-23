import { Toaster } from "sonner"
import ReactQueryProvider from "./_components/react-query-provider"
import { NextIntlClientProvider } from 'next-intl';



export const Providers = ({ children, locale }: { children: React.ReactNode, locale: string }) => {
    return (
        // <ReactQueryProvider>
            <NextIntlClientProvider locale={locale}>
                <Toaster richColors position="top-right" />
                {children}
            </NextIntlClientProvider>
        // </ReactQueryProvider>
    )
}