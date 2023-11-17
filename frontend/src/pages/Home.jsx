import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/home.css';
import { Link, useNavigate } from 'react-router-dom';


const Home = () => {
  const [brand, setBrand] = useState('Welcome DHVSU Archives');
  const [description, setDescription] = useState('Explore and Submit documents');
  const [featuredDocuments, setFeaturedDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const getFeaturedDocuments = () => {
    axios
      .get('http://127.0.0.1:8000/api/documents/')
      .then((res) => {
        const latestDocuments = res.data.slice(0, 4);
        setFeaturedDocuments(latestDocuments);
      })
      .catch((error) => {
        console.error('Error fetching featured documents:', error);
      });
  };

  useEffect(() => {
    getFeaturedDocuments();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    // Navigate to the Library component with the search query
    navigate(`/library?search=${searchQuery}`);
  };

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
        {
          title: 'Document C',
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
    <div className="main-body bg-[#F6F6F6]">
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-4 text-[#600414]">{brand}</h1>
          <p className="text-2xl">{description}</p>
        </div>

        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search Document"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-gray-300 px-4 py-2 outline-none w-96 rounded-lg focus:outline-none focus:border-[#600414] transition duration-300 shadow-lg"
            />
            <button
              onClick={handleSearchClick}
              className="bg-[#600414] hover:scale-110 transition ease-in-out duration-300 text-white rounded-md px-4 py-2 ml-2 shadow-lg"
            >
              Search
            </button>
          </div>

          <button className="bg-[#600414] hover:scale-110 transition ease-in-out duration-300 text-white rounded-md px-4 py-2 mb-32 shadow-lg">
            Submit a Document
          </button>
        </div>

        {/* Featured Documents */}
        <section className="mb-36">
          <h2 className="text-2xl font-bold mb-4">Recent Uploads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredDocuments.map((doc, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 mx-1 hover:scale-110 transition ease-in-out duration-300"
              >
                <h3>
                  <strong>{doc.title}</strong>
                </h3>
                <p>
                  <strong>Abstract: </strong>
                  {doc.abstract}
                </p>
                <Link to={`/document/${doc.id}`}
                  className="bg-[#fbbf24] hover:bg-[#bd8f1a] transition ease-in-out duration-300 text-white rounded px-4 py-2 block text-center mt-2"
                >
                  View Document
                </Link>
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
                  <div
                    key={docIndex}
                    className="bg-white rounded-lg shadow-md p-4 mx-1 hover:scale-110 transition ease-in-out duration-300"
                  >
                    <h4 className="text-lg font-bold mb-2">{document.title}</h4>
                    <p>{document.abstract}</p>
                    <a
                      href={document.link}
                      className="bg-[#fbbf24] hover:bg-[#bd8f1a] transition ease-in-out duration-300 text-white rounded px-4 py-2 block text-center mt-2"
                    >
                      View Document
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
