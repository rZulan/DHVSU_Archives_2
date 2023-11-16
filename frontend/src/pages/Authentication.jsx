import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import logo from '../assets/logo.png';
class Authentication extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      loginData: { username: '', password: '' },
      registerData: {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      },
      redirectToHome: false,
    };

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleRegisterChange = this.handleRegisterChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm() {
    this.setState({ isLogin: !this.state.isLogin });
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
    const { registerUser } = this.context;
    registerUser(event);
    event.preventDefault();
  }

  renderForm() {
    const { isLogin, loginData, registerData } = this.state;

    return isLogin ? (
      <form onSubmit={this.handleLoginSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={this.handleLoginChange}
          placeholder="Username"
          className="w-full border-2 rounded-md p-3"
    
        />
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={this.handleLoginChange}
          placeholder="Password"
          className="w-full border-2 rounded-md p-3"
 
        />
        <button type="submit" className="w-full bg-amber-400 hover:bg-amber-300 text-white rounded-md py-2">
          Login
        </button>
      </form>
    ) : (
      <form onSubmit={this.handleRegisterSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={registerData.email}
          onChange={this.handleRegisterChange}
          placeholder="Email"
          className="w-full border-2 rounded-md p-3"
     
        />
        <input
          type="text"
          name="username"
          value={registerData.username}
          onChange={this.handleRegisterChange}
          placeholder="Username"
          className="w-full border-2 rounded-md p-3"
  
        />
        <input
          type="password"
          name="password"
          value={registerData.password}
          onChange={this.handleRegisterChange}
          placeholder="Password"
          className="w-full border-2 rounded-md p-3"

        />
        <input
          type="password"
          name="confirmPassword"
          value={registerData.confirmPassword}
          onChange={this.handleRegisterChange}
          placeholder="Confirm Password"
          className="w-full border-2 rounded-md p-3"
   
        />
        <button type="submit" className="w-full bg-amber-400 hover:bg-amber-300 text-white rounded-md py-2">
          Register
        </button>
      </form>
    );
  }

  render() {
    if (this.state.redirectToHome) {
      return <Navigate to="/" />;
    }

    return (
      <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#F6F6F6' }}>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center mb-4">
            <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
            <h1 className="text-2xl font-bold" style={{ color: '#600414' }}>DHVSU ARCHIVES</h1>
          </div>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#600414' }}>
            {this.state.isLogin ? 'Login' : 'Register'}
          </h2>
          {this.renderForm()}
          {this.state.isLogin && (
            <div>
              <button className='mt-4 text-[#600414] hover:text-[#36020b]'>
                Forgot Password?
              </button>
            </div>
          )}
          <button
            onClick={this.toggleForm}
            className="mt-4 text-[#600414] hover:text-[#36020b]"
          >
            {this.state.isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    );
  }
}

export default Authentication;
