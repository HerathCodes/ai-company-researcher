import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CompanyTable from '../components/CompanyTable';

function Admin(props){
    const navigate = useNavigate();
    const { isAdmin } = props;


    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
            alert('You must be an admin to view this page');
        }
    }, [isAdmin]);

    return (
        <CompanyTable />
    );
}

export default Admin