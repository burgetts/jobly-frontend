import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import '../css/Navbar.css';

const NavBar = () => {
    const { currentUser, logout } = useContext(UserContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
           
            <NavLink className="navbar-brand mx-2" to='/'>Jobly</NavLink>
            
            {!currentUser ? 
                <>
                    <div className="nav-item ms-auto mx-2">
                        <NavLink className="nav-link" to='/login'>Login</NavLink>
                    </div>
        
                    <div className="nav-item mx-2">
                        <NavLink className="nav-link" to='/signup'>Signup</NavLink>
                    </div>
                </>
                :
                <>
                    <div className="nav-item ms-auto mx-2">
                        <NavLink className="nav-link" to='/companies'>Companies</NavLink>
                    </div>

                    <div className="nav-item mx-2">
                        <NavLink className="nav-link" to='/jobs'>Jobs</NavLink>
                    </div>

                    <div className="nav-item mx-2">
                        <NavLink className="nav-link" to='/profile'>Profile</NavLink>
                    </div>

                    <div className="nav-item mx-2 ">
                        <button className="logout-button" onClick={handleLogout}>Logout {currentUser.username}</button>
                    </div>
                </>}
        </nav>
    )
}

export default NavBar;