/*anime-tracker\frontend\src\components\Sidebar.js*/

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Watching', path: '/watchlist/watching' },
    { name: 'Completed', path: '/watchlist/completed' },
    { name: 'On Hold', path: '/watchlist/on-hold' },
    { name: 'Dropped', path: '/watchlist/dropped' },
    { name: 'Plan to Watch', path: '/watchlist/plan-to-watch' },
    { name: 'Clubs', path: '/clubs' },
    { name: 'Admin Panel', path: '/admin' }
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">AniTrack</h2>
      <ul className="sidebar-menu">
        {menuItems.map((item, idx) => (
          <li key={idx} className={location.pathname === item.path ? 'active' : ''}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
