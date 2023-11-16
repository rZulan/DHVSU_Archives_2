import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const Library = () => {
  const [documentType, setDocumentType] = useState({
    all: true,
    thesis: false,
    capstone: false,
    dissertation: false,
  });

  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;

  const getDocuments = () => {
    axios.get(`http://127.0.0.1:8000/api/documents/`)
      .then(res => {
        setDocuments(res.data);
      })
      .catch(error => {
        console.error("Error fetching documents:", error);
      });
  };

  const handleDocumentTypeChange = (event) => {
    const { name, checked } = event.target;
    setDocumentType((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleFilterClick = () => {
    // Add filtering logic here based on documentType, year, and course
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    // This useEffect will run after every render, including when documents state is updated
  }, [documents]);

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents && documents.slice(indexOfFirstDocument, indexOfLastDocument);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="main-body bg-[#F6F6F6] p-7">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-[15%] p-10 rounded-md shadow-lg bg-white h-[50%] ml-10 m-3">
          <h2 className="text-2xl font-bold mb-6">Filter</h2>
          <div className="mb-4">
            <h3 className="font-semibold">Document Type:</h3>
            
            <label className="block">
              <input
                type="checkbox"
                name="all"
                checked={documentType.all}
                onChange={handleDocumentTypeChange}
                className="mr-2"
              />
              All
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="thesis"
                checked={documentType.thesis}
                onChange={handleDocumentTypeChange}
                className="mr-2"
              />
              Thesis
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="capstone"
                checked={documentType.capstone}
                onChange={handleDocumentTypeChange}
                className="mr-2"
              />
              Capstone
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="dissertation"
                checked={documentType.dissertation}
                onChange={handleDocumentTypeChange}
                className="mr-2"
              />
              Dissertation
            </label>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Year:</h3>
            <select
              value={year}
              onChange={handleYearChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Year</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Course:</h3>
            <select
              value={course}
              onChange={handleCourseChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Course</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Business Administration">
                Business Administration
              </option>
            </select>
          </div>
          <button
            onClick={handleFilterClick}
            className="w-full bg-[#600414] text-white py-3 px-6 rounded hover:bg-[#40030d] transition duration-300"
          >
            Filter
          </button>
        </div>

        <div className="w-full md:w-3/4 p-4 ml-10">
          <div className="flex">
            <input
              type="text"
              placeholder="Search Document"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#600414] transition duration-300 shadow-lg"
            />
            <button
              className="bg-[#600414] text-white py-3 px-6 ml-2 rounded hover:bg-[#40030d] transition duration-300"
            >
              Search
            </button>
          </div>
          <div className="border-t-2 border-gray-300 my-4">
            {currentDocuments &&
              currentDocuments.map((document, index) => (
                <Link to={`/document/${document.id}`} key={index}>
                  <div className="mt-6 bg-white p-4 rounded-lg shadow-md hover:scale-105 transition ease-in-out duration-300" key={index}>
                    <h3 className="text-xl font-semibold mb-2">{document.title}</h3>
                    <p className="text-gray-700">
                      <strong>Abstract:</strong> {document.abstract}
                    </p>
                    <div className="border-t-2 border-gray-300 my-4"></div>
                    <p className="text-gray-700"><strong>Author: </strong>John Doe<strong> Year: </strong>{document.school_year} <strong>Department: </strong> CCS <strong>Course:</strong> BS in Computer Science</p>
                  </div>
                </Link>
              ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <ul className="flex space-x-2">
              <li>
                <button
                  className="bg-[#600414] text-white py-2 px-4 rounded hover:bg-[#40030d]"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: Math.ceil((documents && documents.length) / documentsPerPage) }, (_, i) => (
                <li key={i}>
                  <button
                    className={`bg-[#600414] text-white py-2 px-4 rounded hover:bg-[#40030d] ${currentPage === i + 1 ? 'bg-opacity-60' : ''}`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  className="bg-[#600414] text-white py-2 px-4 rounded hover:bg-[#40030d]"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil((documents && documents.length) / documentsPerPage)}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
