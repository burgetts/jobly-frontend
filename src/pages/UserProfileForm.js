import React, { useState, useContext } from 'react';
import UserContext from '../utils/UserContext';
import JoblyApi from '../utils/api';
import { useFields } from '../utils/hooks';
import '../css/Form.css'

const UserProfileForm = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const INITIAL_STATE = {
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
    }
    const [formData, handleChange] = useFields(INITIAL_STATE)
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const updatedUser = await JoblyApi.updateUserInfo(currentUser.username, formData)
            setCurrentUser(updatedUser)
            setSuccess(true)
        } catch (e) {
            setErrors(e)
        }
    }
    return (
        <div className="Form">
            <h2>Profile</h2>
            <form onSubmit={(handleSubmit)}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={formData.username} disabled></input> 

                <label htmlFor="firstName">First name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}></input>


                <label htmlFor="lastName">Last name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}></input>


                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange}></input>

                {errors ? errors.map((e, idx) => <h6 className="Error-message" key={idx}>{e}</h6>) : ''}
                {success ? <h6 className="Success-message">Updated successfully</h6> : ''}
                <button type="submit">Save Changes</button>
            </form>
        </div>
    )
}

export default UserProfileForm;