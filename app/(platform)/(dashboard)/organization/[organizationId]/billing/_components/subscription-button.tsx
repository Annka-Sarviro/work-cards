'use client';
import { stripeRedirect } from '@/action/stripe-redirect';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { useProdModal } from '@/hooks/use-pro-modal';
import { toast } from 'sonner';

interface SubscriptionButtonProps {
    isPro: boolean;
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
    const proModal = useProdModal();
    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: data => {
            window.location.href = data;
        },
        onError: error => {
            toast.error(error);
        },
    });

    const onClick = () => {
        if (isPro) {
            execute({});
        } else {
            proModal.onOpen();
        }
    };

    return (
        <Button onClick={onClick} disabled={isLoading} variant="primary">
            {isPro ? 'Manage subscription' : 'Upgrade to pro'}
        </Button>
    );
};
