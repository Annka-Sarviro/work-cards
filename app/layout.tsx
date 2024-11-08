import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';

import './globals.css';
import { siteConfig } from '@/config/site';

const colFont = localFont({
    src: '../public/fonts/CalSans-SemiBold.woff2',
    variable: '--font-col',
    weight: '600',
});

const poppinsFont = Poppins({
    subsets: ['latin'],
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: [
        {
            url: '/logo.svg',
            href: '/logo.svg',
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${colFont.variable} ${poppinsFont.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
