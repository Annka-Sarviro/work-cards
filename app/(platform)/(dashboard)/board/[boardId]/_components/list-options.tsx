'use client';

import { copyList } from '@/action/copy-list';
import { deleteList } from '@/action/delete-list';
import { FormSubmit } from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useAction } from '@/hooks/use-action';
import { List } from '@prisma/client';
import { MoreHorizontal, XIcon } from 'lucide-react';
import { ElementRef, useRef } from 'react';
import { toast } from 'sonner';

interface ListOptionsProps {
    list: List;
    onAddCard: () => void;
}

export const ListOptions = ({ list, onAddCard }: ListOptionsProps) => {
    const closeRef = useRef<ElementRef<'button'>>(null);
    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" deleted`);
            closeRef.current?.click();
        },
        onError: error => {
            console.log(error);
            toast.error(error);
        },
    });

    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" copied`);
            closeRef.current?.click();
        },
        onError: error => {
            console.log(error);
            toast.error(error);
        },
    });

    const onDelete = (formData: FormData) => {
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        executeDelete({ id, boardId });
    };

    const onCopy = (formData: FormData) => {
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        executeCopy({ id, boardId });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                    <MoreHorizontal className="size-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <div className="text-sm font-medium text-center pb-4 text-neutral-600">
                    List Actions
                </div>
                <PopoverClose asChild ref={closeRef}>
                    <Button
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <XIcon className="size-4" />
                    </Button>
                </PopoverClose>

                <Button
                    onClick={onAddCard}
                    variant="ghost"
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                >
                    Add card
                </Button>
                <form action={onCopy}>
                    <input hidden name="id" id="id" value={list.id} onChange={() => {}} />
                    <input
                        hidden
                        name="boardId"
                        id="boardId"
                        value={list.boardId}
                        onChange={() => {}}
                    />

                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        Copy list
                    </FormSubmit>
                </form>
                <Separator className="" />
                <form action={onDelete}>
                    <input hidden name="id" id="id" value={list.id} onChange={() => {}} />
                    <input
                        hidden
                        name="boardId"
                        id="boardId"
                        value={list.boardId}
                        onChange={() => {}}
                    />

                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        Delete this list
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
