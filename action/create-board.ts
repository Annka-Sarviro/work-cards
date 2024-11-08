'use server';

import { z } from 'zod';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
export type State = {
    errors?: {
        title?: string[];
    };
    message?: string | null;
};

const CreateBoard = z.object({
    title: z.string().min(3, { message: 'Minimum length of 3 letters is required' }),
});

export async function create(prevStats: State, formData: FormData) {
    const validatedFields = CreateBoard.safeParse({
        title: formData.get('title'),
    });
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors, message: 'missing fields' };
    }

    const { title } = validatedFields.data;
    try {
        await db.board.create({
            data: { title },
        });
    } catch (error) {
        return { message: `Database error ${error}` };
    }

    revalidatePath('/organization/org_2oW9uxFISIdJTYj8lEiGsumORln');
    redirect('/organization/org_2oW9uxFISIdJTYj8lEiGsumORln');
}
