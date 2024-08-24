import React from 'react';
import './ContextMenu.css';

interface ContextMenuProps {
    x: number;
    y: number;
    onAddWidget: () => void;
    onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onAddWidget, onClose }) => {
    return (
        <div className="context-menu" style={{ top: y, left: x }}>
            <button onClick={onAddWidget}>Add Widget</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ContextMenu;
