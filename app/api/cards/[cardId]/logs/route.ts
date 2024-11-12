import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { ENTITY_TYPE } from '@prisma/client';

import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params: paramsPromise }: { params: Promise<{ cardId: string }> }
) {
    const params = await paramsPromise;
    const cardId = params.cardId;
    try {
        const { userId, orgId } = await auth();

        if (!userId || !orgId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const audiLogs = await db.auditLog.findMany({
            where: {
                orgId,
                entityId: cardId,
                entityType: ENTITY_TYPE.CARD,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 3,
        });

        return NextResponse.json(audiLogs);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}
