import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import { useFields } from '../utils/hooks';
import '../css/Form.css';

const SignupForm = () => {
    const { currentUser, signup } = useContext(UserContext)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    }
    const [formData, handleChange] = useFields(INITIAL_STATE)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signup(formData)
        } catch (e) {
            setErrors(e)
        }
    }
    
    if (currentUser) navigate('/')
    return (
        <div className="Form">
            <h2> Sign up </h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange}></input>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange}></input>

                <label htmlFor="firstName">First name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}></input>

                <label htmlFor="lastName">Last name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}></input>

                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange}></input>

                {errors ? errors.map((e, idx) => <h6 className="Error-message" key={idx}>{e}</h6>) : ''}
                <button>Sign up</button>
            </form>
        </div>
    )
}

export default SignupForm;