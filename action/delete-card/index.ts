'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

import { InputType, ReturnType } from './types';
import { auth } from '@clerk/nextjs/server';
import { createSafeAction } from '@/lib/create-safe-action';
import { DeleteCard } from './schema';
import { createAuditLog } from '@/lib/create-audit-log';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        return { error: 'Unauthorize' };
    }

    const { id, boardId } = data;
    let card;
    try {
        card = await db.card.delete({
            where: {
                id,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
        });
        await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.DELETE,
        });
    } catch {
        return {
            error: 'failed to delete',
        };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
