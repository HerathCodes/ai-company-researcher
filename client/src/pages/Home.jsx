import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Search from '../components/Search';
import CompanyCard from '../components/CompanyCard';
import Modal from "../components/Modal";


function Home() {
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [open, setOpen] = useState(true);
    const [isCompanyAdded, setIsCompanyAdded] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleModal = (boolean) => {
        setOpen(boolean);
    };

    const handleQuerySubmit = (query) => {
        setCompany(query);
    };

    const handleCompanyUpdate = (boolean) => {
        setIsCompanyAdded(boolean);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwtDecode(token);
            if (!user) {
                localStorage.removeItem('token');
                // navigate('/login');
            }
            else {
                setIsAuthenticated(true);
            }
        } 
        // else {
        //     navigate('/login');
        // }
    }, [])

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