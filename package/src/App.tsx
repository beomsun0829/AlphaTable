import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [icons, setIcons] = useState<number[]>([]);
  const [nightMode, setNightMode] = useState<boolean>(false);

  const addIcon = () => {
    setIcons([...icons, icons.length + 1]);
  };

  const toggleNightMode = () => {
    setNightMode(!nightMode);
    document.body.classList.toggle('night-mode', !nightMode);
  };

  return (
    <div>
      <div id="header">
        <button id="add-icon" onClick={addIcon}>Add Icon</button>
        <button id="toggle-nightmode" onClick={toggleNightMode}>Night Mode</button>
      </div>
      <div id="grid-container">
        {icons.map((icon, index) => (
          <div key={index} className="icon">
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
