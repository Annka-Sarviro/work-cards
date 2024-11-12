'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

import { InputType, ReturnType } from './types';
import { auth } from '@clerk/nextjs/server';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateListOrder } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        return { error: 'Unauthorize' };
    }

    const { items, boardId } = data;

    let lists;

    try {
        const transaction = items.map(list =>
            db.list.update({
                where: {
                    id: list.id,
                    board: { orgId },
                },
                data: {
                    order: list.order,
                },
            })
        );

        lists = await db.$transaction(transaction);
    } catch {
        return {
            error: 'failed to reorder',
        };
    }

    revalidatePath(`/board/${boardId}`);
    return {
        data: lists,
    };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);