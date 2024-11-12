import { auth, currentUser } from '@clerk/nextjs/server';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { db } from '@/lib/db';

interface Props {
    action: ACTION;
    entityId: string;
    entityType: ENTITY_TYPE;
    entityTitle: string;
}

export const createAuditLog = async (props: Props) => {
    try {
        const { orgId } = await auth();
        const user = await currentUser();

        if (!user || !orgId) {
            throw new Error('User not found');
        }

        const { entityId, entityTitle, entityType, action } = props;
        await db.auditLog.create({
            data: {
                orgId,
                entityId,
                entityTitle,
                entityType,
                action,
                userId: user.id,
                userImage: user?.imageUrl,
                userName: user?.firstName + ' ' + user?.lastName,
            },
        });
    } catch (error) {
        console.log('[AUDIT_LOG_ERROR]', error);
    }
};
