'use client';

import { createBoard } from '@/action/create-board/index';

import { FormInput } from './input';
import { FormButton } from './form-button';
import { useAction } from '@/hooks/use-action';

// import { useFormState } from 'react-dom';

export const Form = () => {
    const { execute, fieldsErrors } = useAction(createBoard, {
        onSuccess: data => {
            console.log(data, 'Success');
        },
        onError: error => {
            console.error(error);
        },
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;

        execute({ title });
    };
    return (
        <form action={onSubmit}>
            <div className="flex flex-col space-y-2">
                <FormInput errors={fieldsErrors} />
            </div>
            <FormButton />
        </form>
    );
};
