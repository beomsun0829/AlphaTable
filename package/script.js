function addIcon() {
    const gridContainer = document.getElementById('grid-container');
    const icons = gridContainer.querySelectorAll('.icon');

    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.textContent = icons.length + 1;
    
    // Append the icon at the end of the container (from left to right)
    gridContainer.appendChild(icon);
}

function toggleNightMode() {
    document.body.classList.toggle('night-mode');
}

document.getElementById('add-icon').addEventListener('click', addIcon);
document.getElementById('toggle-nightmode').addEventListener('click', toggleNightMode);
