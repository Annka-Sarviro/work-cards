import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image src="/logo.svg" alt="logo" height={12} width={30} />
                <p className={cn('text-lg text-neutral-700 bp-1 font-headingFont')}>Taskify</p>
            </div>
        </Link>
    );
};
