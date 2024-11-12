import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params: paramsPromise }: { params: Promise<{ cardId: string }> }
) {
    const params = await paramsPromise;
    const cardId = params.cardId;
    try {
        const { userId, orgId } = await auth();
        if (!userId || !orgId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const card = await db.card.findUnique({
            where: {
                id: cardId,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
            include: {
                list: {
                    select: { title: true },
                },
            },
        });

        return NextResponse.json(card);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}
