import LangToggle from '@/src/shared/components/lang-toggle';
import Image from 'next/image';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <>
            <div className="grid h-screen grid-cols-1 lg:grid-cols-2 dark:bg-ds-bg-inverse overflow-y-auto">
                <div className="flex w-full items-center justify-center overflow-auto px-4 py-2">
                    <div className="mx-auto w-full max-w-lg rounded-xl  space-y-2.5">
                        <LangToggle />

                        {children}
                    </div>
                </div>

                <div className="relative hidden h-screen w-full overflow-hidden lg:block">
                    <Image
                        width={500}
                        height={500}
                        src="/bg.png"
                        alt="Authentication background"
                        className="h-full w-full object-cover"
                        priority
                    />
                </div>
            </div>
        </>
    );
}
