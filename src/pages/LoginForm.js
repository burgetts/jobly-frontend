import React, { useState, useContext } from 'react';
import UserContext from '../utils/UserContext';
import '../css/Form.css';
import { useNavigate } from 'react-router';
import { useFields } from '../utils/hooks';

const LoginForm = () => {
    const {login, currentUser} = useContext(UserContext)
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const INITIAL_STATE = {
        username: '',
        password: ''
    }
    const [formData, handleChange] = useFields(INITIAL_STATE)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(formData.username, formData.password)
        } catch (e){
            setErrors(e)
        }
    }
    if (currentUser) navigate('/')
    return (
        <div className="Form">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange}></input>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange}></input>

                {errors ? errors.map((e, idx) => <h6 className="Error-message" key={idx}>{e}</h6>) : ''}
                <button>Log In</button>
            </form>
        </div>
    )
}

export default LoginForm;