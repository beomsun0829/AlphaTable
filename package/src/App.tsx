import React, { useState } from 'react';
import './App.css';
import TabsSidebar from './components/sidebar/TabsSidebar';
import Header from './components/Header/Header';
import WidgetsGrid from './components/WidgetsGrid/WidgetsGrid';

const App: React.FC = () => {
    const [isLeftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(true);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const [isAddWidgetModalOpen, setAddWidgetModalOpen] = useState<boolean>(false);

    const toggleLeftSidebar = () => {
        setLeftSidebarOpen(!isLeftSidebarOpen);
    };

    const handleRightClick = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu({ x: event.clientX, y: event.clientY });
    };

    const closeContextMenu = () => {
        setContextMenu(null);
    };

    const openAddWidgetModal = () => {
        setContextMenu(null);
        setAddWidgetModalOpen(true);
    };

    return (
        <div className="app-container" onContextMenu={handleRightClick}>
            <TabsSidebar isOpen={isLeftSidebarOpen} toggleSidebar={toggleLeftSidebar} />
            <main className="content">
                <Header />
                <WidgetsGrid
                    contextMenu={contextMenu}
                    isAddWidgetModalOpen={isAddWidgetModalOpen}
                    setAddWidgetModalOpen={setAddWidgetModalOpen}
                    closeContextMenu={closeContextMenu}
                    openAddWidgetModal={openAddWidgetModal}
                />
            </main>
        </div>
    );
};

export default App;
