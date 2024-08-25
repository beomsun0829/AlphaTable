import React, { useEffect, useRef } from 'react';
import './ContextMenu.css';

interface ContextMenuProps {
    x: number;
    y: number;
    onAddWidget: () => void;
    onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onAddWidget, onClose }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();  // Close the context menu
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="context-menu" style={{ top: y, left: x }} ref={menuRef}>
            <button onClick={onAddWidget}>Add Widget</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ContextMenu;
