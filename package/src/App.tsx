import React, { useState } from 'react';
import './App.css';
import BookmarksSidebar from './components/BookmarksSidebar';
import TabsSidebar from './components/TabsSidebar';

const App: React.FC = () => {
    const [icons, setIcons] = useState<number[]>([]);
    const [isLeftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(true);
    const [isRightSidebarOpen, setRightSidebarOpen] = useState<boolean>(true);

    const addIcon = () => {
        setIcons([...icons, icons.length + 1]);
    };

    const toggleLeftSidebar = () => {
        setLeftSidebarOpen(!isLeftSidebarOpen);
    };

    const toggleRightSidebar = () => {
        setRightSidebarOpen(!isRightSidebarOpen);
    };

    return (
        <div className="app-container">
            <BookmarksSidebar isOpen={isLeftSidebarOpen} toggleSidebar={toggleLeftSidebar} />
            <main className="content">
                <div id="header">
                    <button id="add-icon" onClick={addIcon}>Add Icon</button>
                </div>
                <div id="grid-container">
                    {icons.map((icon, index) => (
                        <div key={index} className="icon">
                            {icon}
                        </div>
                    ))}
                </div>
            </main>
            <TabsSidebar isOpen={isRightSidebarOpen} toggleSidebar={toggleRightSidebar} />
        </div>
    );
};

export default App;
