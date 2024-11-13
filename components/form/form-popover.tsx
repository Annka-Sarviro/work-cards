'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { XIcon } from 'lucide-react';
import { FormInput } from './form-input';
import { FormSubmit } from './form-submit';
import { useAction } from '@/hooks/use-action';
import { createBoard } from '@/action/create-board/index';
import { toast } from 'sonner';
import { FormPicker } from './form-picker';
import { ElementRef, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useProdModal } from '@/hooks/use-pro-modal';

interface FormPopoverProps {
    children: React.ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom';
    sideOffset?: number;
    align?: 'start' | 'center' | 'end';
}
export const FormPopover = ({ children, side, sideOffset, align }: FormPopoverProps) => {
    const closeRef = useRef<ElementRef<'button'>>(null);
    const proModal = useProdModal();
    const router = useRouter();
    const { execute, fieldsErrors } = useAction(createBoard, {
        onSuccess: data => {
            toast.success('Board created');
            closeRef.current?.click();
            router.push(`/board/${data.id}`);
        },
        onError: error => {
            toast.error(error);
            proModal.onOpen();
        },
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const image = formData.get('image') as string;
        execute({ title, image });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent align={align} side={side} sideOffset={sideOffset} className="w-80 pt-3">
                <div className="text-sm font-medium text-center text-neutral-600 pb-6">
                    Create board
                </div>
                <PopoverClose asChild ref={closeRef}>
                    <Button
                        variant="ghost"
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                    >
                        <XIcon className="size-4" />
                    </Button>
                </PopoverClose>

                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormPicker id="image" errors={fieldsErrors} />
                        <FormInput
                            id="title"
                            label="Board title"
                            type="text"
                            errors={fieldsErrors}
                        />
                    </div>
                    <FormSubmit className="w-full">Create</FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
