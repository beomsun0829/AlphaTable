import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import collapse_right from '../../assets/collapse-right-svgrepo-com.svg';
import collapse_left from '../../assets/collapse-left-svgrepo-com.svg';

interface TabsSidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

interface ChromeTab {
    id: number;
    title: string;
    url: string;
    favIconUrl?: string;
}

const TabsSidebar: React.FC<TabsSidebarProps> = ({ isOpen, toggleSidebar }) => {
    const [tabs, setTabs] = useState<ChromeTab[]>([]);

    useEffect(() => {
        if (isOpen) {
            if (typeof chrome !== "undefined" && chrome.tabs) {
                // Fetch tabs from Chrome API
                chrome.tabs.query({}, function(tabsArray: chrome.tabs.Tab[]) {
                    const tabsList = tabsArray.map((tab: chrome.tabs.Tab) => ({
                        id: tab.id as number,
                        title: tab.title || 'No title',
                        url: tab.url as string,
                        favIconUrl: tab.favIconUrl
                    }));
                    setTabs(tabsList);
                });
            } else {
                const dummyTabs = [
                    { id: 1, title: "Dummy Tab 1", url: "https://example.com" },
                    { id: 2, title: "Dummy Tab 2", url: "https://example.com" },
                    { id: 3, title: "Dummy Tab 3", url: "https://example.com" }
                ];
                setTabs(dummyTabs);
            }
        }
    }, [isOpen]);

    const switchToTab = (tabId: number) => {
        if (typeof chrome !== "undefined" && chrome.tabs) {
            chrome.tabs.update(tabId, { active: true });
        }
    };

    return (
        <div className={`sidebar tabs-sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <button onClick={toggleSidebar} className='collapse-button'>
                <img src={isOpen ? collapse_right : collapse_left} alt="Toggle Sidebar" />
            </button>
            {isOpen && (
                <ul className="tab-list">
                    {tabs.map(tab => (
                        <li key={tab.id} className="tab-item">
                            <button className="tab-button" onClick={() => switchToTab(tab.id)} title={tab.url}>
                                {tab.favIconUrl && <img src={tab.favIconUrl} alt="Icon" className="tab-icon" />}
                                <span className="tab-title">{tab.title}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TabsSidebar;
