import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-200 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Document Type</h2>
        <label className="block">
          <input type="checkbox" className="mr-2" />
          All
        </label>
        <label className="block">
          <input type="checkbox" className="mr-2" />
          Thesis
        </label>
        <label className="block">
          <input type="checkbox" className="mr-2" />
          Dissertation
        </label>
        <label className="block">
          <input type="checkbox" className="mr-2" />
          Capstone
        </label>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Year</h2>
        {/* Dropdown for Year */}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Department</h2>
        {/* Dropdown for Department */}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Course</h2>
        {/* Dropdown for Course */}
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
        Filter
      </button>
    </div>
  );
};

export default Sidebar;
