'use client';

import { createCard } from '@/action/create-card';
import { FormSubmit } from '@/components/form/form-submit';
import { FormTextarea } from '@/components/form/form-textares';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';

import { PlusIcon, XIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ElementRef, forwardRef, KeyboardEventHandler, useRef } from 'react';
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

interface CardFormProps {
    listId: string;
    isEditing: boolean;
    disabledEditing: () => void;
    enabledEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
    ({ listId, isEditing, disabledEditing, enabledEditing }, ref) => {
        const params = useParams();
        const formRef = useRef<ElementRef<'form'>>(null);

        const { execute, fieldsErrors } = useAction(createCard, {
            onSuccess: data => {
                toast.success(`Card '${data.title}' created`);
                formRef.current?.reset();
            },
            onError: error => {
                toast.error(error);
            },
        });

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                disabledEditing();
            }
        };

        useEventListener('keydown', onKeyDown);
        useOnClickOutside(formRef, disabledEditing);

        const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                formRef.current?.requestSubmit();
            }
        };

        const onSubmit = (formData: FormData) => {
            const title = formData.get('title') as string;
            const boardId = params.boardId as string;
            const listId = formData.get('listId') as string;

            execute({ title, boardId, listId });
        };

        if (isEditing) {
            return (
                <form ref={formRef} action={onSubmit} className="m-1 py-0.5 px-1 space-y-4">
                    <FormTextarea
                        id="title"
                        onKeyDown={onTextareaKeyDown}
                        ref={ref}
                        placeholder="Enter a title for this card"
                        errors={fieldsErrors}
                    />
                    <input hidden id="listId" name="listId" value={listId} onChange={() => {}} />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>Add card</FormSubmit>
                        <Button onClick={disabledEditing} size="sm" variant="ghost">
                            <XIcon className="size-5" />
                        </Button>
                    </div>
                </form>
            );
        }

        return (
            <div className="pt-2 px-2">
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
                    onClick={enabledEditing}
                >
                    <PlusIcon className="size-4 mr-2" />
                    Add a card
                </Button>
            </div>
        );
    }
);

CardForm.displayName = 'CardForm';
