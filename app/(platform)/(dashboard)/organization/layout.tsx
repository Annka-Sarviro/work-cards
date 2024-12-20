import { SideBar } from '../_component/sidebar';

export default function OrganizationLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="pt-20 md:pt-24 px-4 max-w-6xl mx-auto">
            <div className="flex gap-x-7">
                <div className="w-64 shrink-0 hidden md:block">
                    <SideBar />
                </div>
                {children}
            </div>
        </main>
    );
}
