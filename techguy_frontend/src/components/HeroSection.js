import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem } from '@mui/material';
import ApplicationGallery from './ApplicationGallery';
import axios from 'axios';

const HeroSection = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch applications from the backend
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/applications/`)
      .then((response) => {
        setApplications(response.data);
        setFilteredApplications(response.data);
      })
      .catch((error) => console.error('Error fetching applications:', error));
  }, []);

  // Filter suggestions dynamically as the user types
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = applications.filter((app) =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, applications]);

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
    const filtered = applications.filter((app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplications(filtered);
    setShowSuggestions(false); // Hide suggestions after searching
  };

  // Handle selecting a suggestion
  const handleSuggestionClick = (name) => {
    setSearchTerm(name); // Set search term to clicked suggestion
    handleSearch(); // Trigger search
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-purple-900 text-white min-h-screen flex flex-col items-center pt-16">
      {/* Header */}
      <h1 className="text-4xl md:text-6xl font-bold text-center">Explore Applications</h1>
      <p className="text-center text-lg md:text-xl mt-4">Discover and manage your favorite applications.</p>

      {/* Search Bar */}
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
                onClick={() => handleSuggestionClick(app.name)}
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

      {/* Application Gallery */}
      <ApplicationGallery applications={filteredApplications} />
    </div>
  );
};

export default HeroSection;