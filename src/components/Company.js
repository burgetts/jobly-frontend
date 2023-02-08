import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Company.css';


const Company = ({company}) => {
    return (
        <div className="Company">
            <Link to={company.handle}>
                    <p className="Company-title"> <b>{company.name}</b></p>
                    <p>{company.description}</p>
            </Link>
        </div>
    )
}

export default Company;