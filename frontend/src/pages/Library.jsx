import React from 'react';
import Sidebar from '../components/sidebar';
import SearchBar from '../components/Searchbar';
import '../css/library.css';

const Library = () => {
  return (
    <div className="main-body flex">
      <Sidebar />
      <SearchBar />
    </div>
  );
};

export default Library;
