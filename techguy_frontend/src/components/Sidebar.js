import React, { useState } from 'react';
import { Button, IconButton, Avatar, Divider, Menu, MenuItem, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Sidebar = ({ setActivePage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <div
      className={`transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-16'
      } bg-gradient-to-b from-gray-900 to-purple-900 text-white h-screen flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        {isSidebarOpen && <Typography variant="h6" className="font-bold">TechGuy.AI</Typography>}
        <IconButton
          onClick={toggleSidebar}
          sx={{
            color: 'white', // Icon color
          }}
          aria-label="toggle sidebar"
        >
          {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>

      {/* User Profile Section */}
      <div className="flex items-center p-4 space-x-4">
        <Avatar sx={{ bgcolor: 'purple' }}>M</Avatar>
        {isSidebarOpen && (
          <div>
            <Typography variant="body1" className="font-bold">
              Matt Robinson
            </Typography>
            <Typography variant="body2" className="text-gray-300">Admin</Typography>
          </div>
        )}
      </div>
      <Divider sx={{ backgroundColor: 'gray' }} />

      {/* Navigation Links */}
      <nav className="flex flex-col mt-4 space-y-2">
        <Button
          startIcon={<HomeIcon sx={{ color: 'white' }} />}
          fullWidth
          className="justify-start text-white hover:bg-purple-700"
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            fontSize: '16px',
            pl: 2,
          }}
          onClick={() => setActivePage('home')}
        >
          {isSidebarOpen && 'Home'}
        </Button>
        <Button
          startIcon={<AddIcon sx={{ color: 'white' }} />}
          fullWidth
          className="justify-start text-white hover:bg-purple-700"
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            fontSize: '16px',
            pl: 2,
          }}
          onClick={() => setActivePage('add')}
        >
          {isSidebarOpen && 'Add Application'}
        </Button>
        <Button
          startIcon={<ListIcon sx={{ color: 'white' }} />}
          fullWidth
          className="justify-start text-white hover:bg-purple-700"
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            fontSize: '16px',
            pl: 2,
          }}
          onClick={() => setActivePage('list')}
        >
          {isSidebarOpen && 'Application List'}
        </Button>
      </nav>

      {/* Settings Section */}
      <div className="mt-auto p-4">
        <Divider sx={{ backgroundColor: 'gray', mb: 2 }} />
        <Button
          startIcon={<SettingsIcon sx={{ color: 'white' }} />}
          fullWidth
          className="justify-start text-white hover:bg-purple-700"
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            fontSize: '16px',
            pl: 2,
          }}
          onClick={handleProfileMenuOpen}
        >
          {isSidebarOpen && 'Settings'}
        </Button>
      </div>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleProfileMenuClose}
        PaperProps={{
          style: {
            backgroundColor: '#2d2d2d',
            color: 'white',
          },
        }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <AccountCircleIcon sx={{ marginRight: 1 }} /> Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <SettingsIcon sx={{ marginRight: 1 }} /> Settings
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Sidebar;