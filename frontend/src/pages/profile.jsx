import React, { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Enthusiastic learner and tech enthusiast. Passionate about new technologies and software development.',
    profilePic: 'https://via.placeholder.com/150'
  });

  const [uploadedDocuments, setUploadedDocuments] = useState([
    { title: 'Understanding React Hooks', date: '2023-01-01' },
    { title: 'Advanced CSS Techniques', date: '2023-02-01' }
  ]);

  const [recentlyViewed, setRecentlyViewed] = useState([
    { title: 'Node.js Best Practices', date: '2023-03-01' },
    { title: 'Database Optimization Strategies', date: '2023-04-01' }
  ]);

  const [newDocumentTitle, setNewDocumentTitle] = useState('');
  const [favorites, setFavorites] = useState([]);

  const handleDocumentUpload = () => {
    // Handle document upload functionality
    const newDocument = { title: newDocumentTitle, date: new Date().toLocaleDateString() };
    setUploadedDocuments([...uploadedDocuments, newDocument]);
    setNewDocumentTitle('');
  };

  const handleAddFavorite = (title) => {
    // Handle adding a document to favorites
    setFavorites([...favorites, title]);
  };

  return (
    <div className="bg-gray-100 min-h-screen mt-32">
      <div className="container mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/4 p-8">
            <div className="text-center mb-6">
              <img
                src={user.profilePic}
                alt="Profile"
                className="rounded-full w-32 h-32 mb-4 mx-auto border-4 border-[#600414]"
              />
              <h1 className="text-2xl font-semibold text-black">{user.name}</h1>
              <p className="text-black">{user.email}</p>
              <button className="bg-[#600414] hover:bg-[#ffbc2c] text-white font-semibold py-2 px-4 rounded-full my-2">
                Edit Profile
              </button>
            </div>
            <div>
              <p className="text-black text-sm">{user.bio}</p>
            </div>
          </div>
          <div className="md:w-3/4 p-8">

            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 pb-2">Uploaded Documents</h2>
              <ul className="list-disc pl-5">
                {uploadedDocuments.map((doc, index) => (
                  <li key={index} className="mb-2 text-gray-800 flex justify-between items-center">
                    <span>{doc.title}</span>
                    {favorites.includes(doc.title) ? (
                      <span className="text-[#600414]">Bookmarked</span>
                    ) : (
                      <button
                        className="bg-[#600414] hover:bg-[#ffbc2c] text-white font-semibold py-1 px-2 rounded"
                      >
                        View
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 border-b-2 pb-2">Favorites/Bookmarks</h2>
              <ul className="list-disc pl-5">
                {favorites.map((title, index) => (
                  <li key={index} className="mb-2 text-gray-800">
                    {title}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 border-b-2 pb-2">Recently Viewed Documents</h2>
              <ul className="list-disc pl-5">
                {recentlyViewed.map((doc, index) => (
                  <li key={index} className="mb-2 text-gray-800 flex justify-between items-center">
                    <span>{doc.title}</span>
                    {favorites.includes(doc.title) ? (
                      <span className="text-[#600414]">Bookmarked</span>
                    ) : (
                      <button
                        onClick={() => handleAddFavorite(doc.title)}
                        className="bg-[#600414] hover:bg-[#ffbc2c] text-white font-semibold py-1 px-2 rounded"
                      >
                        Add to Favorites
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
