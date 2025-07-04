import React from 'react';
import { useTheme } from '../context/Themes';
import './Navbar.css';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="header">
            <div className="header-container">
                <p className="header-title">Where in the world?</p>
                <button className="theme-toggle" onClick={toggleTheme}>
                    <span className="theme-icon">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </span>
                    <span className="theme-text">
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                </button>
            </div>
        </header>
    );
};

export default Header;
