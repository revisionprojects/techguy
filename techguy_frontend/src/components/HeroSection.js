import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem } from '@mui/material';
import axios from 'axios';

// Get the API Base URL from the environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const HeroSection = ({ applications, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch suggestions as the user types
  useEffect(() => {
    if (searchTerm.trim()) {
      axios
        .get(`${API_BASE_URL}/api/applications/search/?q=${searchTerm}`)
        .then((response) => {
          setSuggestions(response.data);
          setShowSuggestions(true);
        })
        .catch((error) => {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  // Highlight matching text in the suggestion
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
    onSearch(searchTerm);
    setShowSuggestions(false); // Hide suggestions after searching
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

      {/* Search Bar with Dropdown */}
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
              marginLeft: '8px', // Add spacing between button and input
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
              top: '64px', // Adjust to align with input field
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
                  setSearchTerm(app.name); // Set search term to clicked suggestion
                  setShowSuggestions(false); // Hide suggestions
                }}
                sx={{
                  color: '#555', // Dark gray text for better contrast
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
    </div>
  );
};

export default HeroSection;