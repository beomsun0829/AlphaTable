import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './popup.css';

interface ChromeTab {
    id: number;
    title: string;
    url: string;
    favIconUrl?: string;
}

const Popup: React.FC = () => {
    const [tabs, setTabs] = useState<ChromeTab[]>([]);

    useEffect(() => {
        chrome.tabs.query({}, function(tabsArray) {
            const tabsList = tabsArray.map(tab => ({
                id: tab.id!,
                title: tab.title || 'No title',
                url: tab.url!,
                favIconUrl: tab.favIconUrl
            }));
            setTabs(tabsList);
        });
    }, []);

    return (
        <div id="popup-container">
            <ul id="tab-list">
                {tabs.map(tab => (
                    <li key={tab.id} className="tab-item">
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

ReactDOM.render(<Popup />, document.getElementById('popup-container'));
