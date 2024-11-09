import { FormPopover } from '@/components/form/form-popover';
import { Hint } from '@/components/hint';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { HelpCircleIcon, User2Icon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const BoardList = async () => {
    const { orgId } = await auth();

    if (!orgId) {
        return redirect('/select-org');
    }

    const boards = await db.board.findMany({
        where: { orgId },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className="space-y-2">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2Icon className="size-6 mr-2" />
                Your boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {boards.map(board => (
                    <Link
                        href={`/board/${board.id}`}
                        key={board.id}
                        style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
                        className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                        <p className="relative font-semibold text-white">{board.title}</p>
                    </Link>
                ))}

                <FormPopover sideOffset={10} side="right">
                    <div
                        role="button"
                        className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                    >
                        <p className="text-sm">Create new board</p>
                        <span className="text-xs">5 remaining</span>
                        <Hint
                            sideOffset={40}
                            description={`
                            Free workspaces can have up to 5 open board. For unlimited boards upgrade this workspace
                        `}
                        >
                            <HelpCircleIcon className="size-[14px] absolute bottom-2 right-2" />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
        </div>
    );
};

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
        </div>
    );
};