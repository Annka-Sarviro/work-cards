'use client';

import { deleteBoard } from '@/action/delete-board';
import { Button } from '@/components/ui/button';
import { PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAction } from '@/hooks/use-action';
import { Popover } from '@radix-ui/react-popover';
import { MoreHorizontalIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';

interface BoardOptionsProps {
    id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
    const { execute, isLoading } = useAction(deleteBoard, {
        onError: error => {
            toast.error(error);
        },
    });

    const onDelete = () => {
        execute({ id });
    };
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="transparent">
                    <MoreHorizontalIcon className="size-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Board actions
                </div>
                <PopoverClose asChild>
                    <Button
                        variant="ghost"
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                    >
                        <XIcon className="size-4" />
                    </Button>
                </PopoverClose>

                <Button
                    variant="ghost"
                    onClick={onDelete}
                    disabled={isLoading}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                >
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    );
};
