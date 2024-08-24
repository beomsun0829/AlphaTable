import React, { useState, useEffect } from 'react';
import './AddWidgetModal.css';

interface AddWidgetModalProps {
    onClose: () => void;
    onAddIcon: (link: string, name: string, icon: string) => void;
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({ onClose, onAddIcon }) => {
    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchMetadata = async (url: string) => {
        if (!url) return;

        setLoading(true);
        setError('');
        setIcon('');

        const absoluteUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;

        try {
            const faviconUrl = `https://s2.googleusercontent.com/s2/favicons?sz=256&domain=${new URL(absoluteUrl).hostname}`;
            setIcon(faviconUrl);
            setName(url);
        } catch (error) {
            setError('Failed to retrieve site information.');
        }

        setLoading(false);
    };

    useEffect(() => {
        if (link) {
            fetchMetadata(link);
        }
    }, [link]);

    const handleSubmit = () => {
        if (!link || !name || !icon) {
            setError('Please ensure all fields are filled correctly.');
            return;
        }

        onAddIcon(link, name, icon);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Widget</h2>
                <input
                    type="text"
                    placeholder="Enter Link"
                    value={link}
                    onChange={(e) => {
                        setLink(e.target.value);
                        setError('');
                    }}
                />
                <input
                    type="text"
                    placeholder="Enter Widget Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                />
                {loading && <p>Loading metadata...</p>}
                {error && <p className="error">{error}</p>}
                {icon && <img src={icon} alt="Favicon" style={{ width: '32px', height: '32px' }} />}
                <div className="confirmation">
                    <button onClick={handleSubmit} disabled={loading || !name || !icon}>
                        {loading ? 'Loading...' : 'Add Widget'}
                    </button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddWidgetModal;
