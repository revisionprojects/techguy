import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem } from '@mui/material';
import axios from 'axios';

// Get the API Base URL from the environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const HeroSection = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch applications from the backend
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/applications/`)
      .then((response) => {
        setApplications(response.data);
        setFilteredApplications(response.data); // Default to all applications
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  }, []);

  // Fetch suggestions dynamically as the user types
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = applications.filter((app) =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredApplications(filtered);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredApplications(applications);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, applications]);

  // Highlight matching text in the suggestions
  const highlightMatch = (text) => {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ fontWeight: 'bold', color: '#000' }}>
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  // Handle search submission
  const handleSearch = () => {
    const filtered = applications.filter((app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplications(filtered);
    setShowSuggestions(false); // Hide suggestions after searching
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

      {/* Search Bar with Suggestions */}
      <div className="relative w-full mt-8 px-6 max-w-3xl">
        <div className="flex items-center">
          <TextField
            variant="outlined"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
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
              marginLeft: '8px',
            }}
          >
            Search
          </Button>
        </div>
        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <List
            sx={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              borderRadius: '4px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              zIndex: 10,
              maxHeight: '200px',
              overflowY: 'auto',
              padding: 0,
            }}
          >
            {suggestions.map((app) => (
              <ListItem
                key={app.id}
                button
                onClick={() => {
                  setSearchTerm(app.name);
                  setShowSuggestions(false);
                }}
                sx={{
                  color: '#555',
                  padding: '8px 16px',
                  '&:hover': {
                    backgroundColor: '#f1f1f1',
                  },
                }}
              >
                {highlightMatch(app.name)}
              </ListItem>
            ))}
          </List>
        )}
      </div>

      {/* Gallery Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-5xl">
        {filteredApplications.map((app) => (
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