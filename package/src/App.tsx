import React, { useState } from 'react';
import './App.css';
import TabsSidebar from './components/sidebar/TabsSidebar';
import ContextMenu from './components/ContextMenu/ContextMenu';

const App: React.FC = () => {
    const [icons, setIcons] = useState<number[]>([]);
    const [isLeftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(true);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

    const addIcon = () => {
        setIcons([...icons, icons.length + 1]);
        setContextMenu(null);
    };

    const addWidget = () => {
        setContextMenu(null);
    };

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

    return (
        <div className="app-container" onContextMenu={handleRightClick}>
            <TabsSidebar isOpen={isLeftSidebarOpen} toggleSidebar={toggleLeftSidebar} />
            <main className="content">
                <div id="header">
                    <h1>Let Tab</h1>
                </div>
                <div id="grid-container">
                    {icons.map((icon, index) => (
                        <div key={index} className="icon">
                            {icon}
                        </div>
                    ))}
                </div>
            </main>
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onAddIcon={addIcon}
                    onAddWidget={addWidget}
                    onClose={closeContextMenu}
                />
            )}
        </div>
    );
};

export default App;
