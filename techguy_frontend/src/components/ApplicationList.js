import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ApplicationList = ({ applications, handleEdit, handleDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {applications.map((app) => (
        <Card key={app.id} className="shadow-lg">
          <CardContent>
            <Typography variant="h6">{app.name}</Typography>
            <Typography variant="body2" className="mb-4">
              {app.description}
            </Typography>
            <a
              href={app.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Visit
            </a>
            <div className="mt-4">
              <IconButton onClick={() => handleEdit(app)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(app.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ApplicationList;