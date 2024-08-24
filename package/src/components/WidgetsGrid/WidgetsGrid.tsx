import React, { useState, useEffect } from 'react';
import './WidgetsGrid.css';
import ContextMenu from '../ContextMenu/ContextMenu';
import AddWidgetModal from '../AddWidgetModal/AddWidgetModal';

interface WidgetsGridProps {
    contextMenu: { x: number; y: number } | null;
    isAddWidgetModalOpen: boolean;
    setAddWidgetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    closeContextMenu: () => void;
    openAddWidgetModal: () => void;
}

interface Widget {
    link: string;
    icon: string;
    name: string;
}

const WidgetsGrid: React.FC<WidgetsGridProps> = ({
    contextMenu,
    isAddWidgetModalOpen,
    setAddWidgetModalOpen,
    closeContextMenu,
    openAddWidgetModal,
}) => {
    const [widgets, setWidgets] = useState<Widget[]>([]);

    useEffect(() => {
        chrome.storage.sync.get(['widgets'], (result) => {
            if (result.widgets) {
                setWidgets(result.widgets);
            }
        });
    }, []);

    const saveWidgetsToStorage = (widgets: Widget[]) => {
        chrome.storage.sync.set({ widgets }, () => {
            console.log('Widgets saved to chrome storage.');
        });
    };

    const addWidget = (link: string, name: string, icon: string) => {
        const newWidgets = [...widgets, { link, name, icon }];
        setWidgets(newWidgets);
        setAddWidgetModalOpen(false);
        saveWidgetsToStorage(newWidgets);
    };

    const handleWidgetClick = (link: string) => {
        window.location.href = link; // Open the link in the same tab
    };

    return (
        <div id="grid-container">
            {widgets.map((widget, index) => (
                <div
                    key={index}
                    className="widget-box"
                    onClick={() => handleWidgetClick(widget.link)}
                    style={{ cursor: 'pointer' }} // Indicate that the widget is clickable
                >
                    {widget.icon && <img src={widget.icon} alt={widget.name} />}
                    <span>{widget.name}</span>
                </div>
            ))}
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onAddWidget={openAddWidgetModal}
                    onClose={closeContextMenu}
                />
            )}
            {isAddWidgetModalOpen && (
                <AddWidgetModal
                    onClose={() => setAddWidgetModalOpen(false)}
                    onAddIcon={addWidget}
                />
            )}
        </div>
    );
};

export default WidgetsGrid;
