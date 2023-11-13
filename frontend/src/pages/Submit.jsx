import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Submit = () => {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    sections: [],
    newSectionTitle: '',
    newSectionContent: '',
    submitted: false,
    verified: false,
  });

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
    const sections = [...formData.sections, { title: newSectionTitle, content: newSectionContent }];
    setFormData({
      ...formData,
      sections,
      newSectionTitle: '',
      newSectionContent: '',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You'd typically send data to the server or perform actions here
    setFormData({
      ...formData,
      submitted: true,
    });
  };

  const handleVerify = () => {
    // Simulating the verify action
    // Here, you can call an API or a function to check for plagiarism
    setFormData({
      ...formData,
      verified: true,
    });
  };

  if (formData.submitted) {
    return <Navigate to="/" />;
  }

  return (
    <div className ="main-body bg-[#F6F6F6]">
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-center my-4">Submit a Document</h1>
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="mb-8">
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-400 rounded py-2 px-4 mb-4 w-full"
          />

          <label htmlFor="abstract" className="block mb-2">
            Abstract
          </label>
          <textarea
            name="abstract"
            id="abstract"
            value={formData.abstract}
            onChange={handleChange}
            className="border border-gray-400 rounded py-2 px-4 mb-4 w-full h-32"
          />

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Document Sections</h2>
            {formData.sections.map((section, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  name="title"
                  value={section.title}
                  onChange={(e) => handleSectionChange(e, index)}
                  placeholder="Section Title"
                  className="border border-gray-400 rounded py-2 px-4 mb-2 w-full"
                />
                <textarea
                  name="content"
                  value={section.content}
                  onChange={(e) => handleSectionChange(e, index)}
                  placeholder="Section Content"
                  className="border border-gray-400 rounded py-2 px-4 w-full h-24"
                />
                <input
                  type="text"
                  value={`${Math.floor((section.content.length / 1000) * 100)}%`}
                  readOnly
                  className="border border-gray-400 rounded py-1 px-2 w-12 text-center mt-2 mb-5"
                />
                <label className="text-sm ml-1">
                  {Math.floor((section.content.length / 1000) * 100) > 70
                    ? 'Original'
                    : 'Plagiarized'}
                </label>
                {/* Remaining code */}
              </div>
            ))}
            <div className="flex items-start">
              <input
                type="text"
                value={formData.newSectionTitle}
                onChange={(e) => setFormData({ ...formData, newSectionTitle: e.target.value })}
                placeholder="New Section Title"
                className="border border-gray-400 rounded py-2 px-4 mr-2 w-full"
              />
              <textarea
                value={formData.newSectionContent}
                onChange={(e) =>
                  setFormData({ ...formData, newSectionContent: e.target.value })
                }
                placeholder="New Section Content"
                className="border border-gray-400 rounded py-2 px-4 w-full h-24"
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
            {formData.verified && (
              <span className="text-green-500">Verified! No plagiarism detected.</span>
            )}
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
