'use client';

import { Plus, XIcon } from 'lucide-react';
import { ListWrapper } from './list-wrapper';
import { ElementRef, useRef, useState } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { FormInput } from '@/components/form/form-input';
import { useParams, useRouter } from 'next/navigation';
import { FormSubmit } from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { createList } from '@/action/create-list';
import { toast } from 'sonner';

export const ListForm = () => {
    const params = useParams();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const formRef = useRef<ElementRef<'form'>>(null);
    const inputRef = useRef<ElementRef<'input'>>(null);

    const { execute, fieldsErrors } = useAction(createList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" created`);
            disabledEditing();
            router.refresh();
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
            disabledEditing();
        }
    };

    useEventListener('keydown', onKeyDown);
    useOnClickOutside(formRef, disabledEditing);

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const boardId = formData.get('boardId') as string;

        execute({ title, boardId });
    };

    if (isEditing) {
        return (
            <ListWrapper>
                <form
                    action={onSubmit}
                    ref={formRef}
                    className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
                >
                    <FormInput
                        id="title"
                        ref={inputRef}
                        errors={fieldsErrors}
                        placeholder="Enter list title"
                        className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
                    />

                    <input name="boardId" hidden value={params.boardId} onChange={() => {}} />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>Add list</FormSubmit>
                        <Button onClick={disabledEditing} size="sm" variant="ghost">
                            <XIcon className="size-5" />
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        );
    }

    return (
        <ListWrapper>
            <button
                onClick={enabledEditing}
                className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
            >
                <Plus className="size-4 mr-2" />
                Add a list
            </button>
        </ListWrapper>
    );
};
