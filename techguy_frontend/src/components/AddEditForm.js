import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const AddEditForm = ({ formData, setFormData, isEditing, handleSubmit, handleCancel }) => {
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store the uploaded image file
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData(); // Use FormData for file uploads
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('link', formData.link);

    if (imageFile) {
      formDataToSend.append('image', imageFile); // Add the image file
    }

    handleSubmit(formDataToSend); // Pass FormData to the submit handler
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        required
        fullWidth
      />
      <TextField
        label="Link"
        name="link"
        value={formData.link}
        onChange={handleChange}
        required
        fullWidth
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block"
      />
      <div className="flex space-x-4">
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? 'Update Application' : 'Add Application'}
        </Button>
        <Button type="button" variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddEditForm;