import React, { useState } from 'react';
import { Card, CardContent, Typography, Pagination } from '@mui/material';

const FilterableGallery = ({ applications }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = applications.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((app, index) => (
          <Card key={index} className="shadow-lg">
            <div className="relative">
              <img
                src="https://via.placeholder.com/150"
                alt="Placeholder"
                className="w-full h-48 object-cover"
              />
            </div>
            <CardContent>
              <Typography variant="h6" className="truncate">
                {app.name}
              </Typography>
              <Typography variant="body2" className="mb-4 truncate">
                {app.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          count={Math.ceil(applications.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default FilterableGallery;