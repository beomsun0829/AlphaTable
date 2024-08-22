import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './Sidepanel.css';

interface ChromeTab {
    id: number;
    title: string;
    url: string;
    favIconUrl?: string;
    active: boolean;
}

const Sidepanel: React.FC = () => {
    const [tabs, setTabs] = useState<ChromeTab[]>([]);
    const activeTabRef = useRef<HTMLLIElement | null>(null);

    const updateTabs = () => {
        chrome.tabs.query({}, function (tabsArray) {
            const tabsList = tabsArray.map(tab => ({
                id: tab.id!,
                title: tab.title || 'No title',
                url: tab.url!,
                favIconUrl: tab.favIconUrl,
                active: tab.active || false
            }));
            setTabs(tabsList);
        });
    };

    useEffect(() => {
        // Initial tab loading
        updateTabs();

        // Listen for tab activation and updates
        const handleTabChange = () => {
            updateTabs();
        };

        chrome.tabs.onActivated.addListener(handleTabChange);
        chrome.tabs.onUpdated.addListener(handleTabChange);

        // Cleanup listeners on component unmount
        return () => {
            chrome.tabs.onActivated.removeListener(handleTabChange);
            chrome.tabs.onUpdated.removeListener(handleTabChange);
        };
    }, []);

    useEffect(() => {
        if (activeTabRef.current) {
            activeTabRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [tabs]);

    return (
        <div id="sidepanel-container">
            <ul id="tab-list">
                {tabs.map(tab => (
                    <li
                        key={tab.id}
                        className={`tab-item ${tab.active ? 'active-tab' : ''}`}
                        ref={tab.active ? activeTabRef : null}
                    >
                        <button className="tab-button" onClick={() => chrome.tabs.update(tab.id, { active: true })}>
                            {tab.favIconUrl && <img src={tab.favIconUrl} className="tab-icon" alt="Tab Icon" />}
                            <span className="tab-title">{tab.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

ReactDOM.render(<Sidepanel />, document.getElementById('sidepanel-container'));
