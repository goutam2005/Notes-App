import Sidebar from "@/components/sidebar";

function SidebarLayout({ children }) {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content Area */}
            <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}

export default SidebarLayout;
