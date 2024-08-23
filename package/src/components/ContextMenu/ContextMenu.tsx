import React, { useEffect, useRef } from 'react';
import './ContextMenu.css';

interface ContextMenuProps {
    x: number;
    y: number;
    onAddIcon: () => void;
    onAddWidget: () => void;
    onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onAddIcon, onAddWidget, onClose }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={menuRef}
            className="context-menu"
            style={{ top: y, left: x }}
        >
            <ul>
                <li onClick={onAddIcon}>Add Icon</li>
                <li onClick={onAddWidget}>Add Widget</li>
            </ul>
        </div>
    );
};

export default ContextMenu;
