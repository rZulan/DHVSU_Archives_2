import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Submit = () => {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    sections: [],
    file: null,
    newSectionTitle: '',
    newSectionContent: '',
    submitted: false,
    verified: false,
  });

  const averageSimilarityScore =
    formData.sections.reduce((sum, section) => sum + section.similarityScore, 0) /
    formData.sections.length;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
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
  };

  const addNewSection = () => {
    const { newSectionTitle, newSectionContent } = formData;
    const sections = [...formData.sections, { title: newSectionTitle, content: newSectionContent, similarityScore: 0.0, }];
    setFormData({
      ...formData,
      sections,
      newSectionTitle: '',
      newSectionContent: '',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare data to be submitted
    const dataToSubmit = {
      title: formData.title,
      abstract: formData.abstract,
      sections: formData.sections.map(section => ({
        section: section.title,
        content: section.content,
      })),
    };

    console.log('Data to Submit:', dataToSubmit);

    // Send data to the server
    axios.post('http://localhost:8000/api/submit/', dataToSubmit)
    .then(response => {
      console.log('Document submitted successfully:', response.data);
      setFormData({
        ...formData,
        submitted: true,
      });
    })
    .catch(error => {
      console.error('Error submitting document:', error);
    });
  };

  const handleVerify = () => {
    // Simulate the action
    setFormData({
      ...formData,
      verified: true,
    });

    // Send all section contents to the backend to get similarity score
    formData.sections.forEach((section, index) => {
      const content = section.content;
    
      axios.post('http://localhost:8000/api/section/', { content })
        .then(response => {
          const similarityScore = response.data.max_similarity_score; // Get similarity score for this section
          console.log(`Section ${index + 1} Similarity Score: ${similarityScore}`);
          
          setFormData(prevState => {
            const updatedSections = [...prevState.sections];
            updatedSections[index] = { ...updatedSections[index], similarityScore };
            return { ...prevState, sections: updatedSections };
          });
        })
        .catch(error => {
          console.error(`Error fetching similarity score for section ${index + 1}:`, error);
        });
    });
  };

  if (formData.submitted) {
    return <Navigate to="/" />;
  }

  return (
    <div className="main-body bg-[#F6F6F6]">
      <div className="min-h-screen">
        <h1 className="text-3xl font-bold text-center my-4">Submit a Document</h1>
        <div className="container mx-auto px-4 py-8">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="mb-8">
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2 font-semibold">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="border border-gray-400 rounded py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="abstract" className="block mb-2 font-semibold">
                Abstract
              </label>
              <textarea
                name="abstract"
                id="abstract"
                value={formData.abstract}
                onChange={handleChange}
                className="border border-gray-400 rounded py-2 px-4 w-full h-32 focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="file" className="block mb-2 font-semibold">
                File
              </label>
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                className="mb-2 focus:outline-none"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Document Sections</h2>
              {formData.sections.map((section, index) => (
                <div key={index} className="mb-10">
                  <input
                    type="text"
                    name="title"
                    value={section.title}
                    onChange={(e) => handleSectionChange(e, index)}
                    placeholder="Section Title"
                    className="border border-gray-400 rounded py-2 px-4 mb-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                  />
                  <textarea
                    name="content"
                    value={section.content}
                    onChange={(e) => handleSectionChange(e, index)}
                    placeholder="Section Content"
                    className="border border-gray-400 rounded py-2 px-4 w-full h-24 focus:outline-none focus:ring focus:border-blue-400"
                  />
                  <p className="border border-black p-2 inline-block">
                    {`${(section.similarityScore * 100).toFixed(1)}%`}
                  </p>
                  <label className="text-sm ml-1">
                    Plagiarized
                  </label>
                </div>
              ))}
              <p className="text-lg font-semibold mb-2 mt-4">
                Overall Plagiarism Score: <u>{isNaN(averageSimilarityScore) ? '0%' : `${(averageSimilarityScore * 100).toFixed(1)}%`} Plagiarized</u>
              </p>

              <div className="flex items-start">
                <input
                  type="text"
                  value={formData.newSectionTitle}
                  onChange={(e) => setFormData({ ...formData, newSectionTitle: e.target.value })}
                  placeholder="New Section Title"
                  className="border border-gray-400 rounded py-2 px-4 mr-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                />
                <textarea
                  value={formData.newSectionContent}
                  onChange={(e) =>
                    setFormData({ ...formData, newSectionContent: e.target.value })
                  }
                  placeholder="New Section Content"
                  className="border border-gray-400 rounded py-2 px-4 w-full h-24 focus:outline-none focus:ring focus:border-blue-400"
                />
                <button
                  type="button"
                  onClick={addNewSection}
                  className="bg-blue-500 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Section
                </button>
              </div>
            </div>

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
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
