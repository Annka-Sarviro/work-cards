'use client';

import { updateCard } from '@/action/update-card';
import { FormSubmit } from '@/components/form/form-submit';
import { FormTextarea } from '@/components/form/form-textares';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAction } from '@/hooks/use-action';
import { CardWithList } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { AlignLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

interface DescriptionProps {
    data: CardWithList;
}

export const Description = ({ data }: DescriptionProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const queryClient = useQueryClient();
    const params = useParams();

    const textareaRef = useRef<ElementRef<'textarea'>>(null);
    const formRef = useRef<ElementRef<'form'>>(null);

    const { execute, fieldsErrors } = useAction(updateCard, {
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ['card', data.id],
            });
            queryClient.invalidateQueries({
                queryKey: ['card-logs', data.id],
            });
            toast.success(`Card "${data.title} updated`);
            disabledEditing();
        },
        onError: error => {
            toast.error(error);
        },
    });

    const enabledEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
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
        const description = formData.get('description') as string;
        const boardId = params.boardId as string;

        execute({ id: data.id, description, boardId });
    };

    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="size-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">Description</p>
                {isEditing ? (
                    <form ref={formRef} className="space-y-2" action={onSubmit}>
                        <FormTextarea
                            placeholder="Add a more detailed description"
                            defaultValue={data.description || undefined}
                            id="description"
                            className="w-full mt-2"
                            errors={fieldsErrors}
                            ref={textareaRef}
                        />
                        <div className="flex items-center gap-x-2">
                            <FormSubmit>Save</FormSubmit>
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={disabledEditing}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div
                        onClick={enabledEditing}
                        role="button"
                        className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
                    >
                        {data.description || 'Add a more detailed description'}
                    </div>
                )}
            </div>
        </div>
    );
};

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="size-6 bg-neutral-600" />
            <div className="w-ful">
                <Skeleton className="w-24 h-6 mb-2 bg-neutral-600" />
                <Skeleton className="w-full h-[78px]  bg-neutral-600" />
            </div>
        </div>
    );
};
