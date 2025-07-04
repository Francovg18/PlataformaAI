import React from 'react';
import CourseForm from './CourseList';
import CourseList from './CouseForm';
const DashboardProfe = () => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <CourseForm />
      <CourseList />
    </div>
  );
};

export default DashboardProfe;
