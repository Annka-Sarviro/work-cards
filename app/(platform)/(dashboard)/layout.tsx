import { NavBar } from './_component/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full">
            <NavBar />
            {children}
        </div>
    );
}
