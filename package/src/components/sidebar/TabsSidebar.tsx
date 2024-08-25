import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import expandIcon from '../../assets/expand.svg';
import compressIcon from '../../assets/compress.svg';

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
            chrome.tabs.query({}, function (tabsArray: chrome.tabs.Tab[]) {
                const tabsList = tabsArray.map((tab: chrome.tabs.Tab) => ({
                    id: tab.id as number,
                    title: tab.title || 'No title',
                    url: tab.url as string,
                    favIconUrl: tab.favIconUrl,
                    active: tab.active || false
                }));
                setTabs(tabsList);
            });
        }
    }, [isOpen]);

    const switchToTab = (tabId: number) => {
        if (typeof chrome !== "undefined" && chrome.tabs) {
            chrome.tabs.update(tabId, { active: true });
        }
    };

    return (
        <div className={`sidebar tabs-sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <label className="icon-container">
                <input checked={isOpen} type="checkbox" onChange={toggleSidebar} />
                <img src={expandIcon} className="expand" alt="Expand" />
                <img src={compressIcon} className="compress" alt="Compress" />
            </label>
            <ul className="tab-list">
                {tabs.map(tab => (
                    <li
                        key={tab.id}
                        className={'tab-item'}
                    >
                        <button className="tab-button" onClick={() => switchToTab(tab.id)} title={tab.url}>
                            {tab.favIconUrl && <img src={tab.favIconUrl} alt="Icon" className="tab-icon" />}
                            <span className="tab-title">{tab.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TabsSidebar;
