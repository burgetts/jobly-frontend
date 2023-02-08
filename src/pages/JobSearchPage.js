import React, { useState, useEffect } from 'react';
import JoblyApi from '../utils/api';
import Search from '../components/Search';
import Job from '../components/Job';

const JobSearchPage = () => {
    const [jobs, setJobs] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const getJobs = async () => {
            const res = await JoblyApi.getJobs(searchTerm)
            setJobs(res)
        }
        getJobs()
    }, [searchTerm])
    return (
        <>
            <Search setSearchTerm={setSearchTerm} />
            {jobs.map(j => 
                <Job key={j.id} job={j} showCompany={true}/> 
            )}
        </>
    )
}

export default JobSearchPage;