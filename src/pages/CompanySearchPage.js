import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import JoblyApi from '../utils/api.js';
import Company from '../components/Company';

const CompanySearchPage = () => {
    const [companies, setCompanies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const getCompanies = async () => {
            const res = await JoblyApi.getCompanies(searchTerm)
            setCompanies(res)
        }
        getCompanies()
    }, [searchTerm])

    return (
        <div className="CompanySearchPage">
            <Search setSearchTerm={setSearchTerm}/>
            {companies.map(c => 
                <Company company={c} key={c.handle} />
            )}
        </div>
    )
}

export default CompanySearchPage;