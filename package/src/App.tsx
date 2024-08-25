import React, { useState } from 'react';
import './App.css';
import TabsSidebar from './components/sidebar/TabsSidebar';
import Header from './components/Header/Header';
import WidgetsGrid from './components/WidgetsGrid/WidgetsGrid';

const App: React.FC = () => {
    const [isLeftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(true);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; widgetIndex?: number } | null>(null);

    const toggleLeftSidebar = () => {
        setLeftSidebarOpen(!isLeftSidebarOpen);
    };

    const closeContextMenu = () => {
        setContextMenu(null);
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu({ x: event.clientX, y: event.clientY });
    };

    return (
        <div className="app-container" onContextMenu={handleContextMenu}>
            <TabsSidebar isOpen={isLeftSidebarOpen} toggleSidebar={toggleLeftSidebar} />
            <main className="content">
                <Header />
                <WidgetsGrid
                    contextMenu={contextMenu}
                    closeContextMenu={closeContextMenu}
                    setContextMenu={setContextMenu}
                />
            </main>
        </div>
    );
};

export default App;
