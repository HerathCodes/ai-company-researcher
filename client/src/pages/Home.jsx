import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Search from '../components/Search';
import CompanyCard from '../components/CompanyCard';

function Home() {
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);

    const handleQuerySubmit = (query) => {
        setCompany(query);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwtDecode(token);
            if (!user) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [])

    return (
        <div>
            <Search callback={handleQuerySubmit}/>
            {company && <CompanyCard query={company}/>}
        </div>
    )
}

export default Home