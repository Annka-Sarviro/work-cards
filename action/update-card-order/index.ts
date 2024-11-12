'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

import { InputType, ReturnType } from './types';
import { auth } from '@clerk/nextjs/server';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateCardOrder } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        return { error: 'Unauthorize' };
    }

    const { items, boardId } = data;

    let updatedCards;

    try {
        const transaction = items.map(card =>
            db.card.update({
                where: {
                    id: card.id,
                    list: { board: { orgId } },
                },
                data: {
                    order: card.order,
                    listId: card.listId,
                },
            })
        );

        updatedCards = await db.$transaction(transaction);
    } catch {
        return {
            error: 'failed to reorder',
        };
    }

    revalidatePath(`/board/${boardId}`);
    return {
        data: updatedCards,
    };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
