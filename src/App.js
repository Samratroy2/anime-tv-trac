import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import { ThemeProvider, useTheme } from './ThemeContext';
import { ClubProvider } from './contexts/ClubContext'; // ✅ ADD THIS
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import Watching from './pages/Watching';
import Completed from './pages/Completed';
import OnHold from './pages/OnHold';
import Dropped from './pages/Dropped';
import PlanToWatch from './pages/PlanToWatch';
import Admin from './pages/Admin';
import AnimeDetails from './pages/AnimeDetails';

// 🆕 Club pages
import ClubList from './pages/ClubList';
import ClubPage from './pages/ClubPage'; 
import CreateClub from './pages/CreateClub'; 

import './App.css';

const AppLayout = () => {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(location.pathname === '/');
  const { darkMode, toggleTheme } = useTheme();

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  const containerStyle = {
    flex: 1,
    padding: '1rem',
    position: 'relative',
    backgroundColor: darkMode ? '#121212' : '#ffffff',
    color: darkMode ? '#e0e0e0' : '#000000',
    minHeight: '100vh',
    transition: 'all 0.3s ease',
  };

  return (
    <div
      className="app-container"
      style={{
        display: 'flex',
        backgroundColor: darkMode ? '#000' : '#f5f5f5',
        transition: 'background-color 0.3s ease',
      }}
    >
      {sidebarVisible && <Sidebar />}

      <div style={containerStyle}>
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 1000,
            background: darkMode ? '#333' : '#ddd',
            color: darkMode ? '#fff' : '#000',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
            borderRadius: '5px',
            transition: 'all 0.3s ease',
          }}
        >
          {sidebarVisible ? '✖' : '☰'}
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1000,
            background: darkMode ? '#444' : '#ccc',
            color: darkMode ? '#fff' : '#000',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
            borderRadius: '5px',
            transition: 'all 0.3s ease',
          }}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:id" element={<AnimeDetails />} />

          {/* Watchlist Routes */}
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/watchlist/watching" element={<Watching />} />
          <Route path="/watchlist/completed" element={<Completed />} />
          <Route path="/watchlist/on-hold" element={<OnHold />} />
          <Route path="/watchlist/dropped" element={<Dropped />} />
          <Route path="/watchlist/plan-to-watch" element={<PlanToWatch />} />

          {/* Admin Route */}
          <Route path="/admin" element={<Admin />} />

          {/* Club Routes 🆕 */}
          <Route path="/clubs" element={<ClubList />} />
          <Route path="/clubs/create" element={<CreateClub />} />
          <Route path="/club/:id" element={<ClubPage />} />
        </Routes>
      </div>
    </div>
  );
};

// Main App
const App = () => (
  <Router>
    <ThemeProvider>
      <ClubProvider> {/* ✅ Club context provider added properly */}
        <AppLayout />
      </ClubProvider>
    </ThemeProvider>
  </Router>
);

export default App;
