import React from 'react';

const Home = () => {
  const brand = "Welcome DHVSU Archives";
  const description = "Explore and submit documents";
  
  const dummyFeaturedDocuments = [
    {
      title: "Document 1",
      abstract: "This is the abstract for Document 1. lorem aoihfui aehi qau hywu heajkh iwehf uaehw as fjkawh jw3qht ujw3gh jhu whtu whujt hajk klhwtea houji",
      documentLink: "https://www.example.com/document1",
    },
    {
      title: "Document 2",
      abstract: "This is the abstract for Document 2.",
      documentLink: "https://www.example.com/document2",
    },
    {
      title: "Document 2",
      abstract: "This is the abstract for Document 2.",
      documentLink: "https://www.example.com/document2",
    },
    {
      title: "Document 2",
      abstract: "This is the abstract for Document 2.",
      documentLink: "https://www.example.com/document2",
    },
    // ... add more dummy documents
  ];

  const maxItemsPerDepartment = 6;

  const departments = [
    {
      name: 'College of Computing Studies',
      documents: [
        {
          title: 'Document 1',
          abstract: 'Abstract for Document 1 in Computing Studies.',
          link: 'https://example.com/document1',
        },
        {
          title: 'Document 2',
          abstract: 'Abstract for Document 2 in Computing Studies.',
          link: 'https://example.com/document2',
        },
        {
          title: 'Document 3',
          abstract: 'Abstract for Document 2 in Computing Studies.',
          link: 'https://example.com/document2',
        },
        {
          title: 'Document 4',
          abstract: 'Abstract for Document 2 in Computing Studies.',
          link: 'https://example.com/document2',
        },
        {
          title: 'Document 4',
          abstract: 'Abstract for Document 2 in Computing Studies.',
          link: 'https://example.com/document2',
        },
        {
          title: 'Document 4',
          abstract: 'Abstract for Document 2 in Computing Studies.',
          link: 'https://example.com/document2',
        },
        {
          title: 'Document 4',
          abstract: 'Abstract for Document 2 in Computing Studies.',
          link: 'https://example.com/document2',
        },
      ],
    },
    {
      name: 'College of Engineering and Architecture',
      documents: [
        {
          title: 'Document A',
          abstract: 'Abstract for Document A in Engineering and Architecture.',
          link: 'https://example.com/documentA',
        },
        {
          title: 'Document B',
          abstract: 'Abstract for Document B in Engineering and Architecture.',
          link: 'https://example.com/documentB',
        },
      ],
    },
    {
      name: 'College of Education',
      documents: [
        {
          title: 'Document X',
          abstract: 'Abstract for Document X in Education.',
          link: 'https://example.com/documentX',
        },
        {
          title: 'Document Y',
          abstract: 'Abstract for Document Y in Education.',
          link: 'https://example.com/documentY',
        },
      ],
    },
    // Add more departments and their documents as needed
  ];
  
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-4">{brand}</h1>
        <p className="text-lg">{description}</p>
      </div>
      
      <div className="flex flex-col items-center justify-center mb-8">
        {/* Search bar */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-l px-4 py-2 outline-none w-80"
          />
          <button className="bg-blue-500 text-white rounded-r px-4 py-2 ml-2">
            Search
          </button>
        </div>

        {/* Submit a document button */}
        <button className="bg-green-500 text-white rounded px-4 py-2 mb-32">
          Submit a Document
        </button>
      </div>

      {/* Featured Documents */}
      <section className="mb-36">
        <h2 className="text-2xl font-bold mb-4">Featured Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dummyFeaturedDocuments.map((doc, index) => (
            <div key={index} className="bg-slate-300 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
              <div className="p-4 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2">{doc.title}</h3>
                  <p className="mb-4 flex-1">{doc.abstract}</p>
                </div>
                <a href={doc.documentLink} className="bg-blue-500 text-white rounded-b px-4 py-2 block text-center">
                  View Document
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Submitted Documents by Department */}
      <section>
      {departments.map((department, index) => (
        <div key={index} className="mb-4">
          <h1 className="text-xl font-bold mb-2">{department.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-9">
            {department.documents.slice(0, maxItemsPerDepartment).map((document, docIndex) => (
              <div key={docIndex} className="bg-white rounded-lg shadow-md p-4">
                <h4 className="text-lg font-bold mb-2">{document.title}</h4>
                <p>{document.abstract}</p>
                <a href={document.link} className="bg-blue-500 text-white rounded px-4 py-2 block text-center mt-2">
                  View Document
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
    </div>
  );
};

export default Home;