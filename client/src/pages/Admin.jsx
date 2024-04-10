import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import CompanyTable from '../components/CompanyTable';

function Admin(){
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
            <CompanyTable/>
        </>
    )
}

export default Admin