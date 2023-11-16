import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Submit = () => {
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    authors: [],
    course: "",
    schoolYear: "",
    sections: {
      title: "",
      content: "",
      similarityScore: 0.0,
    },
    file: null,
    newSectionTitle: "",
    newSectionContent: "",
    submitted: false,
    verified: false,
  });

  const [errors, setErrors] = useState({
    title: "",
    abstract: "",
    file: "",
    general: "",
    sections: { title: "", content: "" },
    newSectionTitle: "",
    newSectionContent: "",
  });

  const averageSimilarityScore = formData.sections.similarityScore;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
      general: "",
    });
  };

  const handleSectionChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      sections: {
        ...formData.sections,
        [name]: value,
      },
    });

    setErrors({
      ...errors,
      sections: { title: "", content: "" },
      general: "",
    });
  };

  const removeSection = () => {
    setFormData({
      ...formData,
      sections: {
        title: "",
        content: "",
        similarityScore: 0.0,
      },
    });

    setErrors({
      ...errors,
      sections: { title: "", content: "" },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if section title and content are not empty
    if (!formData.sections.title || !formData.sections.content) {
      setErrors({
        ...errors,
        sections: {
          title: "Please provide a section title.",
          content: "Please provide section content.",
        },
      });
      return;
    }

    // Prepare data to be submitted
    const dataToSubmit = {
      title: formData.title,
      abstract: formData.abstract,
      authors: formData.authors.split(", "),
      department: formData.deparment,
      course: formData.course,
      schoolYear: formData.schoolYear,
      sections: [
        {
          section: formData.sections.title,
          content: formData.sections.content,
        },
      ],
    };

    console.log("Data to Submit:", dataToSubmit);

    // Send data to the server
    axios
      .post("http://127.0.0.1:8000/api/submit/", dataToSubmit)
      .then((response) => {
        console.log("Document submitted successfully:", response.data);
        setFormData({
          ...formData,
          submitted: true,
        });
      })
      .catch((error) => {
        console.error("Error submitting document:", error);

        if (error.response && error.response.data && error.response.data.detail) {
          setErrors({
            ...errors,
            general: error.response.data.detail,
          });
        } else if (error.response && error.response.data) {
          setErrors({
            ...errors,
            ...error.response.data,
          });
        } else {
          setErrors({
            ...errors,
            general:
              "An error occurred while submitting the document. Please try again.",
          });
        }
      });
  };

  const handleVerify = () => {
    setFormData({
      ...formData,
      verified: true,
    });

    axios
      .post("http://127.0.0.1:8000/api/section/", {
        content: formData.sections.content,
      })
      .then((response) => {
        const similarityScore = response.data.max_similarity_score;
        console.log(`Section Similarity Score: ${similarityScore}`);

        setFormData((prevState) => ({
          ...prevState,
          sections: {
            ...prevState.sections,
            similarityScore,
          },
        }));
      })
      .catch((error) => {
        console.error("Error fetching similarity score:", error);
      });
  };

  if (formData.submitted) {
    return <Navigate to="/" />;
  }

  return (
    <div className="main-body">
    <div className="bg-gray-100 min-h-screen flex items-center justify-center mt-10">
      <div className="bg-white p-8 rounded shadow-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-3xl font-bold text-center mb-6">Submit a Document</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="mb-8">
          <label htmlFor="title" className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className={`border border-gray-400 rounded py-2 px-4 mb-4 w-full ${errors.title && "border-red-500"}`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}

          <label htmlFor="abstract" className="block mb-2">Abstract</label>
          <textarea
            name="abstract"
            id="abstract"
            value={formData.abstract}
            onChange={handleChange}
            className={`border border-gray-400 rounded py-2 px-4 mb-4 w-full h-32 ${errors.abstract && "border-red-500"}`}
          />
          {errors.abstract && (
            <p className="text-red-500 text-sm">{errors.abstract}</p>
          )}

          <label htmlFor="file" className="block mb-2">File</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) =>
              setFormData({ ...formData, file: e.target.files[0] })
            }
            className={`mb-4 ${errors.file && "border-red-500"}`}
          />
          {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}

          <label htmlFor="authors" className="block mb-2">Authors (Separate with commas if multiple)</label>
          <input
            type="text"
            name="authors"
            id="authors"
            value={Array.isArray(formData.authors) ? formData.authors.join(', ') : formData.authors}
            onChange={handleChange}
            className={`border border-gray-400 rounded py-2 px-4 mb-4 w-full ${errors.authors && "border-red-500"}`}
          />

          <label htmlFor="department" className="block mb-2">
            Department
          </label>
          <select
            name="department"
            id="department"
            value={formData.department}
            onChange={handleChange}
            className={`border border-gray-400 rounded py-2 px-4 mb-4 w-full ${
              errors.department && "border-red-500"
            }`}
          >
            <option value="">Select Department</option>
            <option value="Department 1">Department 1</option>
            <option value="Department 2">Department 2</option>
            <option value="Department 3">Department 3</option>
            {/* Add more options as needed */}
          </select>

          <label htmlFor="course" className="block mb-2">
            Course
          </label>
          <select
            name="course"
            id="course"
            value={formData.course}
            onChange={handleChange}
            className={`border border-gray-400 rounded py-2 px-4 mb-4 w-full ${
              errors.course && "border-red-500"
            }`}
          >
            <option value="">Select Course</option>
            <option value="Course 1">Course 1</option>
            <option value="Course 2">Course 2</option>
            <option value="Course 3">Course 3</option>
            {/* Add more options as needed */}
          </select>

          <label htmlFor="schoolYear" className="block mb-2">
            School Year
          </label>
          <select
            name="schoolYear"
            id="schoolYear"
            value={formData.schoolYear}
            onChange={handleChange}
            className={`border border-gray-400 rounded py-2 px-4 mb-4 w-full ${
              errors.schoolYear && "border-red-500"
            }`}
          >
            <option value="">Select School Year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            {/* Add more options as needed */}
          </select>


          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Document Section</h2>
            <input
              type="text"
              name="title"
              value={formData.sections.title}
              onChange={handleSectionChange}
              placeholder="Section Title"
              className={`border border-gray-400 rounded py-2 px-4 mb-2 w-full ${errors.sections &&
                errors.sections.title &&
                "border-red-500"}`}
            />
            {errors.sections && errors.sections.title && (
              <p className="text-red-500 text-sm">{errors.sections.title}</p>
            )}
            <textarea
              name="content"
              value={formData.sections.content}
              onChange={handleSectionChange}
              placeholder="Section Content"
              className={`border border-gray-400 rounded py-2 px-4 w-full h-24 ${errors.sections &&
                errors.sections.content &&
                "border-red-500"}`}
            />
            {errors.sections && errors.sections.content && (
              <p className="text-red-500 text-sm">{errors.sections.content}</p>
            )}
            <div className="flex items-center mt-2">
              <p className={`border p-2 inline-block ${formData.sections.similarityScore > 0.5
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
                }`}>
                {`${(formData.sections.similarityScore * 100).toFixed(1)}%`}
              </p>
              <label className="text-sm ml-2">
                {formData.sections.similarityScore > 0.5
                  ? "Plagiarized"
                  : "Not Plagiarized"}
              </label>
              <button
                type="button"
                onClick={removeSection}
                className="ml-auto bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Remove Section
              </button>
            </div>
          </div>

          <div className="flex items-start">
            <input
              type="text"
              value={formData.newSectionTitle}
              onChange={(e) =>
                setFormData({ ...formData, newSectionTitle: e.target.value })
              }
              placeholder="New Section Title"
              className={`border border-gray-400 rounded py-2 px-4 mr-2 w-full ${errors.newSectionTitle && "border-red-500"
                }`}
            />
            {errors.newSectionTitle && (
              <p className="text-red-500 text-sm">{errors.newSectionTitle}</p>
            )}
            <textarea
              value={formData.newSectionContent}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  newSectionContent: e.target.value,
                })
              }
              placeholder="New Section Content"
              className={`border border-gray-400 rounded py-2 px-4 w-full h-24 ${errors.newSectionContent && "border-red-500"
                }`}
            />
            {errors.newSectionContent && (
              <p className="text-red-500 text-sm">
                {errors.newSectionContent}
              </p>
            )}
          </div>
          
          {errors.general && (
            <p className="text-red-500 text-sm mb-4">{errors.general}</p>
          )}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleVerify}
              className="bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Verify Plagiarism
            </button>
            <button
              type="submit"
              className="bg-[#600414] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit Document
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Submit;
