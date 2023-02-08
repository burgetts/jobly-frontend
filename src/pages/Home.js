import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import '../css/Home.css'

const Home = () => {
    const { currentUser } = useContext(UserContext)
    return (
        <div className="Home">
            <p className="Home-title">Jobly</p>
            <p className="Home-description">All the jobs in one convenient place.</p>
            {currentUser ? 
                <h3>Welcome back, {currentUser.firstName}!</h3>
                : 
                <div>
                    <button><Link to='/login'>Login</Link></button>
                    <button><Link to='/signup'>Sign up</Link></button>
                </div> 
            }
        </div>
    )
}

export default Home;