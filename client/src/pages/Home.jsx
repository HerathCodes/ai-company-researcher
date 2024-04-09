import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Search from '../components/Search';
import CompanyCard from '../components/CompanyCard';

function Home() {
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleQuerySubmit = (query) => {
        setCompany(query);
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
                console.log(true);
            }
        } 
        // else {
        //     navigate('/login');
        // }
    }, [])

    return (
        <>
            <section className="search-section">
                <Search isAuthenticated={isAuthenticated} callback={handleQuerySubmit}/>
            </section>
            { company && <section className="company-card-section">
                <CompanyCard query={company}/>
            </section>
            }
        </>
    )
}

export default Home