import React, { createContext, useState } from 'react';

type SideBarContextValue = {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    openSidebar: () => void;
    closeSidebar: () => void;
};

export const SideBarContext = createContext<SideBarContextValue>({
    sidebarOpen: false,
    toggleSidebar: () => {},
    openSidebar: () => {},
    closeSidebar: () => {},
});

export const SideBarProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(s => !s);
    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <SideBarContext.Provider value={{ sidebarOpen, toggleSidebar, openSidebar, closeSidebar }}>
            {children}
        </SideBarContext.Provider>
    );
};