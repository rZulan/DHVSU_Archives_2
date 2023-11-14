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

  };

  return (
    <div className="main-body bg-[#F6F6F6] p-7">

      <div className="flex flex-wrap -mx-4">

        <div className="w-full md:w-1/4 p-4 rounded-md shadow-lg bg-white">
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

        <div className="w-full md:w-3/4 p-4">

          <div className="flex">
            <input
              type="text"
              placeholder="Search Document"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#600414] transition duration-300"
            />
            <button
              className="bg-[#600414] text-white py-3 px-6 ml-2 rounded hover:bg-[#40030d] transition duration-300"
            >
              Search
            </button>
          </div>
          
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Document Title</h3>
            <p className="text-gray-700">
              Abstract: This is a sample document abstract. It can contain a brief
              description of the document's content. This is a sample document abstract. It can contain a brief
              description of the document's content.This is a sample document abstract. It can contain a brief
              description of the document's content.This is a sample document abstract. It can contain a brief
              description of the document's content.
            </p>
            <div className="border-t-2 border-gray-300 my-4"></div>
            <p className="text-gray-700"><strong>Author: </strong>John Doe<strong> Year: </strong>2023 <strong>Department: </strong> CCS <strong>Course:</strong> BS in Computer Science</p>
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Document Title</h3>
            <p className="text-gray-700">
              Abstract: This is a sample document abstract. It can contain a brief
              description of the document's content. This is a sample document abstract. It can contain a brief
              description of the document's content.This is a sample document abstract. It can contain a brief
              description of the document's content.This is a sample document abstract. It can contain a brief
              description of the document's content.
            </p>
            <div className="border-t-2 border-gray-300 my-4"></div>
            <p className="text-gray-700"><strong>Author: </strong>John Doe<strong> Year: </strong>2023 <strong>Department: </strong> CCS <strong>Course:</strong> BS in Computer Science</p>
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Document Title</h3>
            <p className="text-gray-700">
              Abstract: This is a sample document abstract. It can contain a brief
              description of the document's content. This is a sample document abstract. It can contain a brief
              description of the document's content.This is a sample document abstract. It can contain a brief
              description of the document's content.This is a sample document abstract. It can contain a brief
              description of the document's content.
            </p>
            <div className="border-t-2 border-gray-300 my-4"></div>
            <p className="text-gray-700"><strong>Author: </strong>John Doe<strong> Year: </strong>2023 <strong>Department: </strong> CCS <strong>Course:</strong> BS in Computer Science</p>
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Document Title</h3>
            <p className="text-gray-700">
              Abstract: This is a sample document abstract. It can contain a brief
              description of the document's content. This is a sample document abstract. It can contain a brief
              description of the document's content.This is a sample document abstract. It can contain a brief
              description of the document's content.This is a sample document abstract. It can contain a brief
              description of the document's content.
            </p>
            <div className="border-t-2 border-gray-300 my-4"></div>
            <p className="text-gray-700"><strong>Author: </strong>John Doe<strong> Year: </strong>2023 <strong>Department: </strong> CCS <strong>Course:</strong> BS in Computer Science</p>
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Document Title</h3>
            <p className="text-gray-700">
              Abstract: This is a sample document abstract. It can contain a brief
              description of the document's content. This is a sample document abstract. It can contain a brief
              description of the document's content.This is a sample document abstract. It can contain a brief
              description of the document's content.This is a sample document abstract. It can contain a brief
              description of the document's content.
            </p>
            <div className="border-t-2 border-gray-300 my-4"></div>
            <p className="text-gray-700"><strong>Author: </strong>John Doe<strong> Year: </strong>2023 <strong>Department: </strong> CCS <strong>Course:</strong> BS in Computer Science</p>
          </div>

        </div>

      </div>

      <div className="mt-6 flex justify-center">
        <ul className="flex space-x-2">
          <li>
            <button className="bg-[#600414] text-white py-2 px-4 rounded hover:bg-[#40030d]">
              Previous
            </button>
          </li>
          <li>
          <button className="bg-[#600414] text-white py-2 px-4 rounded hover:bg-[#40030d]">
              1
            </button>
          </li>
          <li>
          <button className="bg-[#600414] text-white py-2 px-4 rounded hover:bg-[#40030d]">
              2
            </button>
          </li>
          <li>
          <button className="bg-[#600414] text-white py-2 px-4 rounded hover:bg-[#40030d]">
              3
            </button>
          </li>
          <li>
          <button className="bg-[#600414] text-white py-2 px-4 rounded hover:bg-[#40030d]">
              Next
            </button>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Library;
