import React, { useState } from 'react';

const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [selectedModel, setSelectedModel] = useState(null);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setSelectedModel(null);
  };

  const handleModelClick = (model) => {
    setSelectedModel(model);
  };

  const renderContent = () => {
    if (selectedModel) {

      return (
        <div>
          <button onClick={() => setSelectedModel(null)}>Back</button>
          {selectedModel === 'departments' ? (
            <div>
              <h2>Departments Content</h2>
            </div>
          ) : selectedModel === 'courses' ? (
            <div>
              <h2>Courses Content</h2>
            </div>
          ) : null}
        </div>
      );
    }

    switch (selectedTab) {
      case 'dashboard':
        return (
          <div>
            <h1 className='text-3xl font-bold mb-4'>Dashboard</h1>
            <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-6'>
              <div className='bg-blue-200 p-6 rounded-lg shadow-md'>Total Users: 1000</div>
              <div className='bg-green-200 p-6 rounded-lg shadow-md'>Total Visits: 5000</div>
              <div className='bg-yellow-200 p-6 rounded-lg shadow-md'>Published Documents: 50</div>
              <div className='bg-pink-200 p-6 rounded-lg shadow-md'>Pending Documents: 10</div>
            </div>
          </div>
        );
      case 'settings':
        const handleSaveAdminSettings = () => {

          console.log('Admin settings saved');
        };

        const handleSaveWebsiteSettings = () => {

          console.log('Website settings saved');
        };

        return (
          <div>
            <h1 className='text-3xl font-bold mb-4'>Settings</h1>
            <div className='grid grid-cols-2 gap-8'>
              <div>
                <h2 className='text-2xl font-bold mb-4'>Admin Settings</h2>
                <div className='bg-white p-6 rounded-lg shadow-md'>
                  <div className='mb-4'>
                    <label htmlFor='adminUsername' className='block text-gray-700 font-semibold mb-2'>Username:</label>
                    <input type='text' id='adminUsername' className='w-full border rounded-md p-3' />
                  </div>
                  {/* Add more admin settings inputs/fields here */}
                  <button onClick={handleSaveAdminSettings} className='bg-blue-500 text-white py-2 px-4 rounded-md'>
                    Save Admin Settings
                  </button>
                </div>
              </div>
              <div>
                <h2 className='text-2xl font-bold mb-4'>Website Settings</h2>
                <div className='bg-white p-6 rounded-lg shadow-md'>
                  <div className='mb-4'>
                    <label htmlFor='websiteTitle' className='block text-gray-700 font-semibold mb-2'>Website Title:</label>
                    <input type='text' id='websiteTitle' className='w-full border rounded-md p-3' />
                  </div>
                  <button onClick={handleSaveWebsiteSettings} className='bg-blue-500 text-white py-2 px-4 rounded-md'>
                    Save Website Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'database':
        return (
          <div>
            <h1 className='text-3xl font-bold mb-4'>Database</h1>
            <div className='grid grid-cols-2 gap-8'>
              <div>
                <h2 className='text-2xl font-bold mb-4'>Departments</h2>
                <div className='bg-pink-200 p-4 cursor-pointer rounded-md mb-4' onClick={() => handleModelClick('departments')}>
                  Department 1
                </div>
                <div className='bg-blue-200 p-4 cursor-pointer rounded-md' onClick={() => handleModelClick('departments')}>
                  Department 2
                </div>
              </div>
              <div>
                <h2 className='text-2xl font-bold mb-4'>Courses</h2>
                <div className='bg-green-200 p-4 cursor-pointer rounded-md mb-4' onClick={() => handleModelClick('courses')}>
                  Course 1
                </div>
                <div className='bg-orange-200 p-4 cursor-pointer rounded-md' onClick={() => handleModelClick('courses')}>
                  Course 2
                </div>
              </div>
            </div>
          </div>
        );
      case 'statistics':
        return (
          <div>
            <h1 className='text-3xl font-bold mb-4'>Statistics</h1>
          </div>
        );
      default:
        return (
          <div>
            <h1 className='text-3xl font-bold mb-4'>Dashboard</h1>
          </div>
        );
    }
  };

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <div className='w-full md:w-64 bg-gray-900 text-gray-100'>
        <div className='p-4 text-2xl font-bold'>Admin Panel</div>
        <nav className='p-2'>
          <a href='#' className='block py-2 hover:bg-gray-800' onClick={() => handleTabClick('dashboard')}>Dashboard</a>
          <a href='#' className='block py-2 hover:bg-gray-800' onClick={() => handleTabClick('settings')}>Settings</a>
          <a href='#' className='block py-2 hover:bg-gray-800' onClick={() => handleTabClick('database')}>Database</a>
          <a href='#' className='block py-2 hover:bg-gray-800' onClick={() => handleTabClick('statistics')}>Statistics</a>
          <a href='#' className='block py-2 hover:bg-gray-800' onClick={() => handleTabClick('logout')}>Logout</a>
        </nav>
      </div>

      <div className='flex-1 p-4 md:p-8'>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPage;