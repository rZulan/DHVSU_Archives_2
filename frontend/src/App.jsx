import { useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    const csrfToken = parts.length === 2 ? parts.pop().split(';').shift() : null;
    console.log('CSRF Token:', csrfToken);
    return csrfToken;
  }

  function handleCallbackResponse(response) {
    console.log('Full Response:', response);
    console.log('Encoded JWT:', response.credential);
  
    const csrftoken = getCookie('csrftoken');
    axios.post('http://127.0.0.1:8000/authme/', {
      id_token: response.credential,
    }, {
      headers: {
        'X-CSRFToken': csrftoken,
        'Authorization': `Bearer ${csrftoken}`, // Replace 'token' with your actual token variable
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      console.log('Received data from Django:', response.data);
    })
    .catch(error => {
      console.error('Error sending data to Django:', error);
    });
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

  return (
    <div>
      <div id='signInDiv'></div>
    </div>
  )
}

export default App