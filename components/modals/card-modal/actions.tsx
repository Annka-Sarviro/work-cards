import { copyCard } from '@/action/copy-card';
import { deleteCard } from '@/action/delete-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAction } from '@/hooks/use-action';
import { useCardModal } from '@/hooks/use-card-modal';
import { CardWithList } from '@/types';
import { Copy, Trash } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

interface ActionsProps {
    data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
    const params = useParams();
    const cardModal = useCardModal();
    const { execute: executeCardCopy, isLoading: isLoadingCopyCard } = useAction(copyCard, {
        onSuccess: data => {
            toast.success(`Card "${data.title} copied"`);
            cardModal.onClose();
        },
        onError: error => {
            toast.error(error);
        },
    });

    const { execute: executeDeleteCard, isLoading: isLoadingDeleteCard } = useAction(deleteCard, {
        onSuccess: data => {
            toast.success(`Card "${data.title} deleted"`);
            cardModal.onClose();
        },
        onError: error => {
            toast.error(error);
        },
    });

    const onCopy = () => {
        const boardId = params.boardId as string;
        executeCardCopy({ id: data.id, boardId });
    };

    const onDelete = () => {
        const boardId = params.boardId as string;
        executeDeleteCard({ id: data.id, boardId });
    };
    return (
        <div className="space-y-3 mt-2 md:my-0">
            <p className="text-sm font-semibold">Actions</p>

            <Button
                onClick={onCopy}
                disabled={isLoadingCopyCard}
                variant="gray"
                size="inline"
                className="w-full justify-start"
            >
                <Copy className="size-4 mr-2" />
                Copy
            </Button>
            <Button
                onClick={onDelete}
                disabled={isLoadingDeleteCard}
                variant="gray"
                size="inline"
                className="w-full justify-start"
            >
                <Trash className="size-4 mr-2" />
                Delete
            </Button>
        </div>
    );
};

Actions.Skeleton = function ActionsSkeleton() {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
        </div>
    );
};
