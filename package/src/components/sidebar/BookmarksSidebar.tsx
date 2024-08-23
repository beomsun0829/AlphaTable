import React from 'react';
import './Sidebar.css';
import expandIcon from '../../assets/expand.svg';
import compressIcon from '../../assets/compress.svg';

interface BookmarksSidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const BookmarksSidebar: React.FC<BookmarksSidebarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar bookmarks-sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <label className="icon-container">
                <input checked={isOpen} type="checkbox" onChange={toggleSidebar} />
                <img src={expandIcon} className="expand" alt="Expand" />
                <img src={compressIcon} className="compress" alt="Compress" />
            </label>
            {isOpen && (
                <ul>
                    <li>Bookmark 1</li>
                    <li>Bookmark 2</li>
                    <li>Bookmark 3</li>
                </ul>
            )}
        </div>
    );
};

export default BookmarksSidebar;
