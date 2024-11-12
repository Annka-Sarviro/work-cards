'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

import { InputType, ReturnType } from './types';
import { auth } from '@clerk/nextjs/server';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateCard } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        return { error: 'Unauthorize' };
    }

    const { id, boardId, ...values } = data;

    let card;
    try {
        card = await db.card.update({
            where: {
                id,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
            data: {
                ...values,
            },
        });
    } catch {
        return {
            error: 'failed to update',
        };
    }

    revalidatePath(`/board/${boardId}`);
    return {
        data: card,
    };
};

export const updateCard = createSafeAction(UpdateCard, handler);
