import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

// Get the API Base URL from the environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const HeroSection = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState([]);

  // Fetch applications from the backend
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/applications/`)
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  }, []);

  // Handle search submission
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-purple-900 text-white min-h-screen flex flex-col items-center pt-16">
      {/* Hero Section Header */}
      <h1 className="text-4xl md:text-6xl font-bold text-center">
        Explore Applications
      </h1>
      <p className="text-center text-lg md:text-xl mt-4">
        Discover and manage your favorite applications.
      </p>

      {/* Search Bar */}
      <div className="relative w-full mt-8 px-6 max-w-3xl">
        <div className="flex items-center">
          <TextField
            variant="outlined"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              backgroundColor: 'white',
              borderRadius: '4px',
              flex: 1,
              '.MuiOutlinedInput-root': {
                height: '56px',
              },
            }}
            InputProps={{
              style: {
                height: '56px',
                borderRadius: '4px',
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              height: '56px',
              minWidth: '120px',
              textTransform: 'none',
              borderRadius: '4px',
              marginLeft: '8px', // Add spacing between button and input
            }}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-5xl">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105"
          >
            <img
              src={app.image}
              alt={app.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{app.name}</h3>
              <p className="text-gray-600">{app.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;