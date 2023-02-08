import React, { useState, useEffect } from 'react';
import Router from './routes/Router';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import JoblyApi from './utils/api';
import UserContext from './utils/UserContext';
import { useLocalStorage } from './utils/hooks';
import './css/App.css';

const App = () => {
  const [token, setToken] = useLocalStorage('token', null)
  const [currentUser, setCurrentUser] = useState(null)

  // on token change, get user info and store in current user
  useEffect(() => {
    async function getUser() {
      try {
        const user = await JoblyApi.getUser(token)
        setCurrentUser(user)
      } catch {
        return
      }
    }
    if (token) getUser()
  }, [token])

 // get token, set token state 
 async function login(username, password) {
    const token = await JoblyApi.getToken(username, password) 
    if (!token) return 
    setToken(token)
  }

  // clear user from state and token in localStorage
  function logout() {
    setCurrentUser(null)
    setToken(null)
  }

  // register new user and store their token in localStorage
  async function signup(user) {
    const token = await JoblyApi.register(user)
    if (!token) return
    setToken(token)
   }


  return (
    <div className="App">
        <BrowserRouter>
          <UserContext.Provider value={{login, currentUser, logout, signup, setCurrentUser, token}}>
            <Navbar />
            <Router />
          </UserContext.Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;
