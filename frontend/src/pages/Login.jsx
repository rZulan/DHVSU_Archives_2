import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
  const [jwtToken, setJwtToken] = useState('');

  function handleCallbackResponse(response) {
    console.log('Full Response:', response);
    console.log('Encoded JWT:', response.credential);
    setJwtToken(response.credential); // Assuming response.credential is the JWT token
    Cookies.set('jwtToken', response.credential, { expires: 7 });
  }

  function isLoggedIn() {
    return Cookies.get('jwtToken') !== undefined; // Check if the token exists in cookies
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '632832146913-kj0cd29v9j9a16fn39mb9ioirfq5438r.apps.googleusercontent.com',
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    )
  }, [])

  useEffect(() => {
    if (isLoggedIn()) {
      const csrftoken = Cookies.get('csrftoken');
      axios.post('http://127.0.0.1:8000/authme/', {
        id_token: Cookies.get('jwtToken'),
      }, {
        headers: {
          'X-CSRFToken': csrftoken,
          'Authorization': `Bearer ${Cookies.get('jwtToken')}`, // Use the JWT from the cookie
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        console.log('Received data from Django:', response.data);
        // Handle successful login or any other logic here
      })
      .catch(error => {
        console.error('Error sending data to Django:', error);
        // Handle error response or further logic here
      });
    }
  }, [])
  const handleLogout = () => {
    Cookies.remove('jwtToken'); // Remove the JWT token from the cookie on logout
    // Additional logic for clearing user data or redirect if needed
  };

  return (
    <div>
      <div id='signInDiv'></div>
      {isLoggedIn() ? ( // Conditionally render based on authentication status
        <button onClick={handleLogout}>Logout</button> // Show logout button if logged in
      ) : (
        <div id='signInDiv'></div>
      )}
    </div>
  )
}

export default Login;
