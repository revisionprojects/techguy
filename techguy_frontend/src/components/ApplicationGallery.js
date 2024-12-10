import React from 'react';
import ApplicationCard from './ApplicationCard';

const ApplicationGallery = ({ applications }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
      {applications.map((app) => (
        <ApplicationCard key={app.id} app={app} />
      ))}
    </div>
  );
};

export default ApplicationGallery;