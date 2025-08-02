// frontend/src/components/Sidebar.js
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome, FaListAlt, FaCheck, FaPause, FaBan, FaClock,
  FaUsers, FaTools
} from 'react-icons/fa';
import { useTheme } from '../ThemeContext';
import './Sidebar.css';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { darkMode } = useTheme();

  // ✅ Auto collapse/expand based on screen width
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setCollapsed]);

  const navItems = [
    { label: 'Home', icon: <FaHome />, to: '/' },
    { label: 'Watching', icon: <FaListAlt />, to: '/watchlist/watching' },
    { label: 'Completed', icon: <FaCheck />, to: '/watchlist/completed' },
    { label: 'On Hold', icon: <FaPause />, to: '/watchlist/on-hold' },
    { label: 'Dropped', icon: <FaBan />, to: '/watchlist/dropped' },
    { label: 'Plan to Watch', icon: <FaClock />, to: '/watchlist/plan-to-watch' },
    { label: 'Clubs', icon: <FaUsers />, to: '/clubs' },
    { label: 'Admin Panel', icon: <FaTools />, to: '/admin' },
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${darkMode ? 'dark' : 'light'}`}>
      <div className="logo">{!collapsed && <h2>AniTrack</h2>}</div>
      <nav>
        {navItems.map((item, index) => (
          <NavLink key={index} to={item.to} className="nav-item">
            <span className="icon">{item.icon}</span>
            {!collapsed && <span className="label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
