import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

class Authentication extends Component {
  static contextType = AuthContext;
  
  constructor(props) {
    super(props);
    this.state = {
      loginData: { username: '', password: '' },
      registerData: {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      },
      redirectToHome: false, // New state to control navigation
    };

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleRegisterChange = this.handleRegisterChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  handleLoginChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      loginData: {
        ...prevState.loginData,
        [name]: value,
      },
    }));
  }

  handleRegisterChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      registerData: {
        ...prevState.registerData,
        [name]: value,
      },
    }));
  }

  handleLoginSubmit(event) {
    const { loginUser } = this.context;
    loginUser(event);
    event.preventDefault();
  }

  handleRegisterSubmit(event) {
    event.preventDefault();
    this.setState({ redirectToHome: true });
  }


  render() {
    if (this.state.redirectToHome) {
      return <Navigate to="/" />;
    }

    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-4xl flex">
          <div className="w-1/2 p-4 flex flex-col justify-between">
            <div className="bg-blue-200 rounded-lg p-4 mb-4 flex-1">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <form onSubmit={this.handleLoginSubmit} className="mb-8">
                <input
                  type="text"
                  name="username"
                  value={this.state.loginData.username}
                  onChange={this.handleLoginChange}
                  placeholder="Username"
                  className="w-full border border-gray-300 rounded-md p-2 mb-2"
                />
                <input
                  type="password"
                  name="password"
                  value={this.state.loginData.password}
                  onChange={this.handleLoginChange}
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                />
                <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2">
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="w-1/2 p-4 flex flex-col justify-between">
            <div className="bg-green-200 rounded-lg p-4 mb-4 flex-1">
              <h2 className="text-2xl font-bold mb-4">Register</h2>
              <form onSubmit={this.handleRegisterSubmit}>
                <input
                  type="email"
                  name="email"
                  value={this.state.registerData.email}
                  onChange={this.handleRegisterChange}
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-md p-2 mb-2"
                />
                <input
                  type="text"
                  name="username"
                  value={this.state.registerData.username}
                  onChange={this.handleRegisterChange}
                  placeholder="Username"
                  className="w-full border border-gray-300 rounded-md p-2 mb-2"
                />
                <input
                  type="password"
                  name="password"
                  value={this.state.registerData.password}
                  onChange={this.handleRegisterChange}
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-md p-2 mb-2"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={this.state.registerData.confirmPassword}
                  onChange={this.handleRegisterChange}
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                />
                <button type="submit" className="w-full bg-green-500 text-white rounded-md py-2">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Authentication;
