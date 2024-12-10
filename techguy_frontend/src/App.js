import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import ApplicationList from './components/ApplicationList';
import AddEditForm from './components/AddEditForm';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/applications/';

const App = () => {
  const [activePage, setActivePage] = useState('home'); // Tracks the current active page
  const [applications, setApplications] = useState([]); // List of applications from the database
  const [filteredApplications, setFilteredApplications] = useState([]); // Filtered applications for gallery
  const [formData, setFormData] = useState({ name: '', description: '', link: '' }); // Form data
  const [isEditing, setIsEditing] = useState(false); // Tracks if we're editing

  // Fetch applications from the database on load
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setApplications(response.data);
        setFilteredApplications(response.data); // Initially show all applications in the gallery
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  }, []);

  // Handle search in the gallery
  const handleSearch = (searchTerm) => {
    const filtered = applications.filter((app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplications(filtered);
  };

  // Add a new application
  const handleCreate = (formDataToSend) => {
    axios
      .post(API_URL, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      })
      .then((response) => {
        setApplications([...applications, response.data]);
        setFilteredApplications([...applications, response.data]);
        setFormData({ name: '', description: '', link: '' });
        setActivePage('list');
      })
      .catch((error) => {
        console.error('Error adding application:', error);
      });
  };

  // Update an existing application
  const handleUpdate = (formDataToSend) => {
    axios
      .put(`${API_URL}${formData.id}/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      })
      .then((response) => {
        const updatedApplications = applications.map((app) =>
          app.id === formData.id ? response.data : app
        );
        setApplications(updatedApplications);
        setFilteredApplications(updatedApplications);
        setFormData({ name: '', description: '', link: '' });
        setIsEditing(false);
        setActivePage('list');
      })
      .catch((error) => {
        console.error('Error updating application:', error);
      });
  };

  // Edit application
  const handleEdit = (app) => {
    setFormData(app);
    setIsEditing(true);
    setActivePage('add');
  };

  // Delete an application
  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}${id}/`)
      .then(() => {
        const updatedApplications = applications.filter((app) => app.id !== id);
        setApplications(updatedApplications);
        setFilteredApplications(updatedApplications);
      })
      .catch((error) => {
        console.error('Error deleting application:', error);
      });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 to-purple-900">
      {/* Sidebar for navigation */}
      <Sidebar setActivePage={setActivePage} />

      {/* Main content area */}
      <div className="flex-1 bg-gradient-to-b from-gray-900 to-purple-900">
        {/* Home Page (Hero Section + Gallery) */}
        {activePage === 'home' && (
          <HeroSection
            applications={filteredApplications}
            onSearch={handleSearch}
          />
        )}

        {/* Application List for managing CRUD */}
        {activePage === 'list' && (
          <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Application List</h1>
            <ApplicationList
              applications={applications}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        )}

        {/* Add/Edit Form */}
        {activePage === 'add' && (
          <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">
              {isEditing ? 'Edit Application' : 'Add Application'}
            </h1>
            <AddEditForm
              formData={formData}
              setFormData={setFormData}
              isEditing={isEditing}
              handleSubmit={isEditing ? handleUpdate : handleCreate}
              handleCancel={() => {
                setFormData({ name: '', description: '', link: '' });
                setIsEditing(false);
                setActivePage('list');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;