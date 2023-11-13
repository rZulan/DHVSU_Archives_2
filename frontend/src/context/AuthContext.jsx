import { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  )
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  )
  let [loading, setLoading] = useState(true)

  let registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/", // Replace with your registration endpoint
        {
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log('registered')
        await loginUser(e)
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("Registration error:", error);
    }
  };

  let loginUser = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/",
        {
          username: e.target.username.value,
          password: e.target.password.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (response.status === 200) {
        const data = response.data
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem("authTokens", JSON.stringify(data))
        navigate("/")
      } else {
        console.log("User not found!")
      }
    } catch (error) {
    }
  }

  let logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem("authTokens")
    navigate("/login")
  }

  let updateToken = async () => {
    try {
      if (!authTokens?.refresh) {
        logoutUser()
        return
      }
  
      const response = await axios.post(
        "http://localhost:8000/api/token/refresh/",
        { refresh: authTokens.refresh },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
  
      if (response.status === 200) {
        const data = response.data
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem("authTokens", JSON.stringify(data))
      } else {
        logoutUser()
      }
  
      if (loading) {
        setLoading(false)
      }
    } catch (error) {
      console.error("Token update error:", error)
      logoutUser()
    }
  }

  
  let contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser, // Add the registerUser function to the context data
  };

  useEffect(()=> {
    if(loading) {
      updateToken()
    }
    
    let minutes = 4 * 1000 * 60
    
    let interval = setInterval(()=> {
      if(authTokens) {
        updateToken()
      }
    }, minutes)
    return()=> clearInterval(interval)
    
  }, [authTokens, loading])
  
  return(
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}