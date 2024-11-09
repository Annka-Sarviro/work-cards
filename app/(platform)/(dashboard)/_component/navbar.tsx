import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import { MobileSidebar } from './mobile-sidebar';
import { FormPopover } from '@/components/form/form-popover';

export const NavBar = () => {
    return (
        <nav className="fixed z-50 top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
            <MobileSidebar />
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
                <FormPopover align="start" side="bottom" sideOffset={18}>
                    <Button variant="primary" className="hidden md:flex">
                        Create
                    </Button>
                </FormPopover>
                <FormPopover>
                    <Button variant="primary" size="sm" className="rounded-md block md:hidden">
                        <Plus className="size-4" />
                    </Button>
                </FormPopover>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    hidePersonal
                    afterLeaveOrganizationUrl="/select-org"
                    afterCreateOrganizationUrl="/organization/:id"
                    afterSelectOrganizationUrl="/organization/:id"
                    appearance={{
                        elements: {
                            rootBox: {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                        },
                    }}
                />
                <UserButton
                    afterSwitchSessionUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 30,
                                width: 30,
                            },
                        },
                    }}
                />
            </div>
        </nav>
    );
};
