import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <input
        type="text"
        className="border border-gray-300 rounded-lg py-2 px-4 w-1/2"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
