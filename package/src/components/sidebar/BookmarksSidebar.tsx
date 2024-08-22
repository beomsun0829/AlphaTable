import React from 'react';
import './Sidebar.css';
import collapse_right from '../../assets/collapse-right-svgrepo-com.svg';
import collapse_left from '../../assets/collapse-left-svgrepo-com.svg';

interface BookmarksSidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const BookmarksSidebar: React.FC<BookmarksSidebarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar bookmarks-sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <button onClick={toggleSidebar} className='collapse-button'>
                <img src={isOpen ? collapse_left : collapse_right} alt = "Toggle Sidebar"/>
            </button>
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
