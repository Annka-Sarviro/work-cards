'use client';

import { updateList } from '@/action/update-list';
import { FormInput } from '@/components/form/form-input';
import { useAction } from '@/hooks/use-action';
import { List } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { ListOptions } from './list-options';

interface ListHeaderProps {
    list: List;
}
export const ListHeader = ({ list }: ListHeaderProps) => {
    const [title, setTitle] = useState(list.title);
    const [isEditing, setIsEditing] = useState(false);
    const formRef = useRef<ElementRef<'form'>>(null);
    const inputRef = useRef<ElementRef<'input'>>(null);

    const { execute } = useAction(updateList, {
        onSuccess: data => {
            toast.success(`Renamed to "${data.title}"`);
            setTitle(data.title);
            disabledEditing();
        },
        onError: error => {
            toast.error(error);
        },
    });

    const enabledEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 100);
    };

    const disabledEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            formRef.current?.requestSubmit();
        }
    };

    useEventListener('keydown', onKeyDown);
    useOnClickOutside(formRef, disabledEditing);

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        if (title === list.title) {
            return disabledEditing();
        }

        execute({ title, id, boardId });
    };

    const onBlur = () => {
        formRef.current?.requestSubmit();
    };

    return (
        <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
            {isEditing ? (
                <form ref={formRef} className="flex-1 px-[2px]" action={onSubmit}>
                    <input hidden id="id" name="id" value={list.id} onChange={() => {}} />
                    <input
                        hidden
                        id="boardId"
                        name="boardId"
                        value={list.boardId}
                        onChange={() => {}}
                    />
                    <FormInput
                        ref={inputRef}
                        id="title"
                        placeholder="Enter list title"
                        defaultValue={title}
                        onBlur={onBlur}
                        className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
                    />
                    <button type="submit" hidden />
                </form>
            ) : (
                <div
                    onClick={enabledEditing}
                    className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
                >
                    {title}
                </div>
            )}

            <ListOptions onAddCard={() => {}} list={list} />
        </div>
    );
};
