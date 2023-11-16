import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Submit = () => {
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    sections: [],
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
    sections: [],
    newSectionTitle: "",
    newSectionContent: "",
  });

  const addDefaultSections = () => {
    const defaultSections = [
      { title: "Chapter I", content: "Introduction... Background of the Study...", similarityScore: 0.0 },
      { title: "Chapter II", content: "Related Literature... Related Studies...", similarityScore: 0.0 },
      { title: "Chapter III", content: "Methodology...", similarityScore: 0.0 },
      { title: "Chapter IV", content: "", similarityScore: 0.0 },
      { title: "Chapter V", content: "", similarityScore: 0.0 },
    ];
    setFormData({
      ...formData,
      sections: [...formData.sections, ...defaultSections],
    });
  };

  const averageSimilarityScore =
    formData.sections.reduce(
      (sum, section) => sum + section.similarityScore,
      0
    ) / formData.sections.length;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error message when user starts typing
    setErrors({
      ...errors,
      [name]: "",
      general: "",
    });
  };

  const handleSectionChange = (event, index) => {
    const { name, value } = event.target;
    const sections = [...formData.sections];
    sections[index][name] = value;
    setFormData({
      ...formData,
      sections,
    });

    // Clear error message when user starts typing
    setErrors({
      ...errors,
      sections: [
        ...errors.sections.slice(0, index),
        { title: "", content: "" },
        ...errors.sections.slice(index + 1),
      ],
      general: "",
    });
  };

  const addNewSection = () => {
    const { newSectionTitle, newSectionContent } = formData;
    const sections = [
      ...formData.sections,
      {
        title: newSectionTitle,
        content: newSectionContent,
        similarityScore: 0.0,
      },
    ];
    setFormData({
      ...formData,
      sections,
      newSectionTitle: "",
      newSectionContent: "",
    });

    // Clear error message for the new section
    setErrors({
      ...errors,
      sections: [...errors.sections, { title: "", content: "" }],
    });
  };

  const removeSection = (index) => {
    const sections = [...formData.sections];
    sections.splice(index, 1);
    setFormData({
      ...formData,
      sections,
    });

    // Remove error message for the removed section
    setErrors({
      ...errors,
      sections: [
        ...errors.sections.slice(0, index),
        ...errors.sections.slice(index + 1),
      ],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.sections.length === 0) {
      setErrors({
        ...errors,
        sections: [{ title: "Please add at least one section.", content: "" }],
      });
      return; // Do not proceed with submission
    }

    // Prepare data to be submitted
    const dataToSubmit = {
      title: formData.title,
      abstract: formData.abstract,
      sections: formData.sections.map((section) => ({
        section: section.title,
        content: section.content,
      })),
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

        // Check if the error is a custom error message from the server
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          setErrors({
            ...errors,
            general: error.response.data.detail,
          });
        } else if (error.response && error.response.data) {
          // Set error messages for specific fields
          setErrors({
            ...errors,
            ...error.response.data,
          });
        } else {
          // Handle other types of errors
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

    formData.sections.forEach((section, index) => {
      const content = section.content;

      axios
        .post("http://127.0.0.1:8000/api/section/", { content })
        .then((response) => {
          const similarityScore = response.data.max_similarity_score;
          console.log(
            `Section ${index + 1} Similarity Score: ${similarityScore}`
          );

          setFormData((prevState) => {
            const updatedSections = [...prevState.sections];
            updatedSections[index] = {
              ...updatedSections[index],
              similarityScore,
            };
            return { ...prevState, sections: updatedSections };
          });
        })
        .catch((error) => {
          console.error(
            `Error fetching similarity score for section ${index + 1}:`,
            error
          );
        });
    });
  };

  if (formData.submitted) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center mt-10">
      <div className="bg-white p-8 rounded shadow-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-3xl font-bold text-center mb-6">
          Submit a Document
        </h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mb-8"
        >
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className={`border border-gray-400 rounded py-2 px-4 mb-4 w-full ${errors.title && "border-red-500"
              }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}

          <label htmlFor="abstract" className="block mb-2">
            Abstract
          </label>
          <textarea
            name="abstract"
            id="abstract"
            value={formData.abstract}
            onChange={handleChange}
            className={`border border-gray-400 rounded py-2 px-4 mb-4 w-full h-32 ${errors.abstract && "border-red-500"
              }`}
          />
          {errors.abstract && (
            <p className="text-red-500 text-sm">{errors.abstract}</p>
          )}

          <label htmlFor="file" className="block mb-2">
            File
          </label>
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

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Document Sections</h2>
            {formData.sections.map((section, index) => (
              <div key={index} className="mb-6">
                <input
                  type="text"
                  name="title"
                  value={section.title}
                  onChange={(e) => handleSectionChange(e, index)}
                  placeholder="Section Title"
                  className={`border border-gray-400 rounded py-2 px-4 mb-2 w-full ${errors.sections &&
                    errors.sections[index] &&
                    errors.sections[index].title &&
                    "border-red-500"
                    }`}
                />
                {errors.sections &&
                  errors.sections[index] &&
                  errors.sections[index].title && (
                    <p className="text-red-500 text-sm">
                      {errors.sections[index].title}
                    </p>
                  )}
                <textarea
                  name="content"
                  value={section.content}
                  onChange={(e) => handleSectionChange(e, index)}
                  placeholder="Section Content"
                  className={`border border-gray-400 rounded py-2 px-4 w-full h-24 ${errors.sections &&
                    errors.sections[index] &&
                    errors.sections[index].content &&
                    "border-red-500"
                    }`}
                />
                {errors.sections &&
                  errors.sections[index] &&
                  errors.sections[index].content && (
                    <p className="text-red-500 text-sm">
                      {errors.sections[index].content}
                    </p>
                  )}
                <div className="flex items-center mt-2">
                  <p
                    className={`border p-2 inline-block ${section.similarityScore > 0.5
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                      }`}
                  >
                    {`${(section.similarityScore * 100).toFixed(1)}%`}
                  </p>
                  <label className="text-sm ml-2">
                    {section.similarityScore > 0.5
                      ? "Plagiarized"
                      : "Not Plagiarized"}
                  </label>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="ml-auto bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Remove Section
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-start">
              <button
                type="button"
                onClick={addDefaultSections}
                className="bg-gray-500 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
              >
                Add Default Sections
              </button>
            </div>
            <p className="text-lg font-semibold mb-2 mt-4">
              Overall Plagiarism Score:{" "}
              <u>
                {isNaN(averageSimilarityScore)
                  ? "0%"
                  : `${(averageSimilarityScore * 100).toFixed(1)}%`}{" "}
                Plagiarized
              </u>
            </p>

            {/* Display section error message */}
            {errors.sections && errors.sections[0] && (
              <p className="text-red-500 text-sm">{errors.sections[0].title}</p>
            )}

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
              <button
                type="button"
                onClick={addNewSection}
                className="bg-[#600414] text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
              >
                Add Section
              </button>
            </div>
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
  );
};

export default Submit;
