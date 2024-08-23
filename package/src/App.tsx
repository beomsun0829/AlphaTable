import React, { useState } from 'react';
import './App.css';
import TabsSidebar from './components/sidebar/TabsSidebar';

const App: React.FC = () => {
    const [icons, setIcons] = useState<number[]>([]);
    const [isLeftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(true);

    const addIcon = () => {
        setIcons([...icons, icons.length + 1]);
    };

    const toggleLeftSidebar = () => {
        setLeftSidebarOpen(!isLeftSidebarOpen);
    };

    return (
        <div className="app-container">
            <TabsSidebar isOpen={isLeftSidebarOpen} toggleSidebar={toggleLeftSidebar} />
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
        </div>
    );
};

export default App;
