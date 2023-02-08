import React, { useContext } from 'react';
import JoblyApi from '../utils/api';
import UserContext from '../utils/UserContext';
import '../css/Job.css';

const Job = ({job, showCompany}) => {
    const { currentUser, setCurrentUser, token } = useContext(UserContext) // is having token here okay?
    const applyForJob = async () => {
        // apply for job on backend
        await JoblyApi.applyForJob(currentUser.username, job.id)
        // update current user info (???)
        const updatedUser = await JoblyApi.getUser(token)
        setCurrentUser(updatedUser)
    }   

    return (
        <div className="Job">
            <p className="Job-title"><b>{job.title}</b></p>
            {showCompany ? <p className="Job-company-name"><i>{job.companyName}</i></p> : ''}
            <div className="Job-details">
                <span>Salary: {job.salary}</span> <br/>
                <span>Equity: {job.equity}</span>
            </div>
           
            {currentUser.applications.includes(job.id) 
                ? <button className="Job-applied-button" disabled>Applied</button>
                : <button className="Job-apply-button" onClick={applyForJob}>Apply</button>
            }
            
        </div>
    )
}

export default Job;