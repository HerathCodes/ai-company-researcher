import React, { useState, useEffect } from 'react'
import Search from '../components/Search';
import CompanyCard from '../components/CompanyCard';
import Modal from "../components/Modal";


function Home(props) {
    const { isAuthenticated } = props; 
    const [company, setCompany] = useState(null);
    const [open, setOpen] = useState(true);
    const [isCompanyAdded, setIsCompanyAdded] = useState(true);

    const handleModal = (boolean) => {
        setOpen(boolean);
    };

    const handleQuerySubmit = (query) => {
        setCompany(query);
    };

    const handleCompanyUpdate = (boolean) => {
        setIsCompanyAdded(boolean);
    };


    return (
        <>
            <section className="search-section">
                <Search isAuthenticated={isAuthenticated} handleModal={handleModal} handleQuerySubmit={handleQuerySubmit} handleCompanyUpdate={handleCompanyUpdate} isCompanyAdded={isCompanyAdded}/>
                { company && !company._id && <Modal open={open} handleModal={handleModal} query={company} handleQuerySubmit={handleQuerySubmit} handleCompanyUpdate={handleCompanyUpdate} /> } 
            </section>
            { company && company._id && <section className="company-card-section">
                <CompanyCard query={company}/>
            </section>
            }
        </>
    )
}

export default Home