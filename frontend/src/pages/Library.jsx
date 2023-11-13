import React, { useState } from "react";

const Library = () => {
  const [documentType, setDocumentType] = useState({
    all: true,
    thesis: false,
    capstone: false,
    dissertation: false,
  });

  const [year, setYear] = useState("");

  const [course, setCourse] = useState("");

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
    // handle filter logic here
  };

  return (
    <div className="main-body">
      <div className="w-full mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex">
        <div className="w-1/4 p-4">
          <h2 className="text-xl font-bold mb-4">Filter</h2>
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
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Filter
          </button>
        </div>
        <div className="w-3/4 p-4">
          <h2 className="text-xl font-bold mb-4">Example Document</h2>
          <h3 className="font-semibold">Document Title</h3>
          <p>Author: John Doe</p>
          <p>Year: 2023</p>
          <p>
            Abstract: This is a sample document abstract. It can contain a brief
            description of the document's content.
          </p>
          <p>Department: Computer Science</p>
          <p>Courses: BSCS</p>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <ul className="flex space-x-2">
          <li>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Previous
            </button>
          </li>
          <li>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              1
            </button>
          </li>
          <li>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              2
            </button>
          </li>
          <li>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              3
            </button>
          </li>
          <li>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Library;
