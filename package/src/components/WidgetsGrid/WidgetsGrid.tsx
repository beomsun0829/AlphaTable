import React, { useState, useEffect } from 'react';
import './WidgetsGrid.css';
import ContextMenu from '../ContextMenu/ContextMenu';
import AddWidgetModal from '../AddWidgetModal/AddWidgetModal';

interface WidgetsGridProps {
    contextMenu: { x: number; y: number; widgetIndex?: number } | null;
    closeContextMenu: () => void;
    setContextMenu: React.Dispatch<React.SetStateAction<{ x: number; y: number; widgetIndex?: number } | null>>;
}

interface Widget {
    link: string;
    icon: string;
    name: string;
}

const WidgetsGrid: React.FC<WidgetsGridProps> = ({
    contextMenu,
    closeContextMenu,
    setContextMenu,
}) => {
    const [widgets, setWidgets] = useState<Widget[]>([]);
    const [isAddWidgetModalOpen, setAddWidgetModalOpen] = useState<boolean>(false);

    useEffect(() => {
        chrome.storage.sync.get(['widgets'], (result) => {
            if (result.widgets) {
                setWidgets(result.widgets);
            }
        });

        const handleClickOutside = () => {
            closeContextMenu();
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
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
        window.location.href = link;
    };

    const handleWidgetRightClick = (event: React.MouseEvent, index: number) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenu({ x: event.clientX, y: event.clientY, widgetIndex: index });
    };

    const deleteWidget = () => {
        if (contextMenu && contextMenu.widgetIndex !== undefined) {
            const newWidgets = [...widgets];
            newWidgets.splice(contextMenu.widgetIndex, 1);
            setWidgets(newWidgets);
            saveWidgetsToStorage(newWidgets);
            closeContextMenu();
        }
    };

    return (
        <div id="grid-container">
            {widgets.map((widget, index) => (
                <div
                    key={index}
                    className="widget-box"
                    onClick={() => handleWidgetClick(widget.link)}
                    onContextMenu={(e) => handleWidgetRightClick(e, index)}
                    style={{ cursor: 'pointer' }}
                >
                    {widget.icon && <img src={widget.icon} alt={widget.name} />}
                    <span>{widget.name}</span>
                </div>
            ))}
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onAddWidget={() => setAddWidgetModalOpen(true)}
                    onDeleteWidget={deleteWidget}
                    onClose={closeContextMenu}
                    isWidget={contextMenu.widgetIndex !== undefined}
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
