'use client';

import { useProdModal } from '@/hooks/use-pro-modal';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useAction } from '@/hooks/use-action';
import { stripeRedirect } from '@/action/stripe-redirect';
import { toast } from 'sonner';

export const ProModal = () => {
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
        execute({});
    };
    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogTitle hidden>Billing modal</DialogTitle>
            <DialogContent className="max-w-md p-0 overflow-hidden">
                <div className="aspect-video relative flex items-center justify-center">
                    <Image src="/hero.svg" alt="image" sizes="50vw" fill className="object-fill" />
                </div>
                <div className="text-neutral-700 mx-auto space-y-6 p-6">
                    <h2 className="font-semibold text-xl">Upgrade to Taskify Pro Today</h2>
                    <p className="text-xs font-semibold text-neutral-600">
                        Explore the best to Taskify
                    </p>
                    <div className="pl-3">
                        <ul className="text-sm list-disc">
                            <li>Unlimited boards</li>
                            <li>Advanced checklists</li>
                            <li>Admin and security features</li>
                            <li>And more!</li>
                        </ul>
                    </div>
                    <Button
                        disabled={isLoading}
                        onClick={onClick}
                        className="w-full"
                        variant="primary"
                    >
                        Upgrade
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
