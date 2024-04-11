import React, { useState, useEffect, useRef } from 'react'
import Search from '../components/Search';
import CompanyCard from '../components/CompanyCard';
import Modal from "../components/Modal";


function Home(props) {
    const { isAuthenticated } = props; 
    const [company, setCompany] = useState(null);
    const [open, setOpen] = useState(true);
    const [isCompanyAdded, setIsCompanyAdded] = useState(true);
    const elementRef = useRef(null);

    const scrollToElement = () => {
        if (elementRef.current) {
            elementRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

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
            <div className="hero-container">
                <div className="hero">
                    <h1>GIST</h1>
                    <h4>get the gist of it..</h4>
                </div>
            </div>
            <section className="search-section">
                <Search isAuthenticated={isAuthenticated} handleModal={handleModal} handleQuerySubmit={handleQuerySubmit} handleCompanyUpdate={handleCompanyUpdate} isCompanyAdded={isCompanyAdded} scrollFeature={scrollToElement}/>
                { company && !company._id && <Modal open={open} handleModal={handleModal} query={company} handleQuerySubmit={handleQuerySubmit} handleCompanyUpdate={handleCompanyUpdate} /> } 
            </section>
             <section className="company-card-section" ref={elementRef}>
             { company && company._id &&<CompanyCard query={company}/>}
            </section>
            
        </>
    )
}

export default Home