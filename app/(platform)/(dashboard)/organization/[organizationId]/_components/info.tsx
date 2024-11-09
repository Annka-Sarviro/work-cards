'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useOrganization } from '@clerk/nextjs';
import { CreditCardIcon } from 'lucide-react';
import Image from 'next/image';

export const Info = () => {
    const { organization, isLoaded } = useOrganization();

    if (!isLoaded) {
        return <Info.Skeleton />;
    }
    return (
        <div className="flex gap-x-4 items-center">
            <div className="w-[60px] h-[60px] relative">
                <Image
                    fill
                    alt="Organization cover"
                    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                    src={organization?.imageUrl!}
                    className="rounded-md object-cover"
                />
            </div>
            <div className="space-y-1">
                <p className="text-xl font-semibold">{organization?.name}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                    <CreditCardIcon className="size-3 mr-1" />
                    Free
                </div>
            </div>
        </div>
    );
};

Info.Skeleton = function SkeletonInfo() {
    return (
        <div className="flex items-center gap-x-2">
            <div className="w-[60px] h-[60px] relative">
                <Skeleton className="h-full w-full absolute" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-10 w-[200px]" />
                <div className="flex items-center">
                    <Skeleton className="size-4 mr-2" />
                    <Skeleton className="h-4 w-[100px]" />
                </div>
            </div>
        </div>
    );
};
