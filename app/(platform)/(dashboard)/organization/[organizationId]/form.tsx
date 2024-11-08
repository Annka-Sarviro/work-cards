'use client';

import { create } from '@/action/create-board';

import { useActionState } from 'react';
import { FormInput } from './input';
import { FormButton } from './form-button';

// import { useFormState } from 'react-dom';

export const Form = () => {
    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useActionState(create, initialState);
    return (
        <form action={dispatch}>
            <div className="flex flex-col space-y-2">
                <FormInput errors={state?.errors} />
            </div>
            <FormButton />
        </form>
    );
};
