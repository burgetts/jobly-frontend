import React, { useEffect, useState  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoblyApi from '../utils/api';
import Loader from '../components/Loader';
import Job from '../components/Job';
import '../css/CompanyDetail.css';

const CompanyDetailPage = () => {
    const { handle } = useParams()
    const [company, setCompany] = useState()
    const navigate = useNavigate()
    
    // Get company and job info on page load
    useEffect(() => {
        const getCompany = async () => {
            const res = await JoblyApi.getCompany(handle)
            // if no company, redirect to home page
            if (!res) {
                navigate('/')
            }
            setCompany(res)
        }
        getCompany()
    }, [handle, navigate])
    
    if (!company){
        return (<Loader />)
    } else {
    return (
            <div className="CompanyDetail">
                <p className="CompanyDetail-name"> {company.name} </p>
                <p className="CompanyDetail-description"> {company.description} </p>  
                {company.jobs.map(j => 
                    <Job key={j.id} job={j} showCompany={false} />
                )}
             </div>
        )
    }
}

export default CompanyDetailPage;