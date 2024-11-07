'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SideBar } from './sidebar';

export const MobileSidebar = () => {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    const onOpen = useMobileSidebar(state => state.onOpen);
    const onClose = useMobileSidebar(state => state.onClose);
    const isOpen = useMobileSidebar(state => state.isOpen);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Button onClick={onOpen} className="block md:hidden mr-2" size="sm" variant="ghost">
                <Menu className="size-4" />
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetTitle className="sr-only">navigate menu</SheetTitle>
                <SheetContent side="left" className="p-2 pt-10" aria-description="sidebar">
                    <SideBar storageKey="card-sidebar-mobile-state" />
                </SheetContent>
            </Sheet>
        </>
    );
};
