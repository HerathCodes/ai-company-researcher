import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

function CompanyTable() {
    const [companies, setCompanies] = useState([]);


    useEffect(() => {
        async function getCompanies() {
            const response = await fetch(`http://localhost:3000/api/companies/`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const companies = await response.json();
            setCompanies(companies);
        }
        getCompanies();
        return;
    }, [companies.length]);

    async function deleteCompany(e, id) {
        await fetch(`http://localhost:3000/api/companies/${id}`, {
            method: "DELETE",
        });
        const newCompanies = companies.filter((el) => el._id !== id);
        setCompanies(newCompanies);
    }

    const columns = [
        { field: '_id', headerName: 'ID' , width: 300},
        { field: 'Name', headerName: 'Name', width: 300},
        { field: 'createdAt', headerName: 'CreationDate', width: 300},
        { field: 'actions', headerName: 'Actions', width: 300, renderCell: (params) => {
            return (
              <button
                onClick={(e) => deleteCompany(e, params.row._id)}
                variant="contained"
              >
                Delete
              </button>
            );
          } }
    ];

    return (
        <>
            <DataGrid style={{height: 700, width: '100%'}}
                getRowId={(row) => row._id}
                rows={companies}
                columns={columns}
                pageSize={10}
            >
            </DataGrid>
        </>
    );
}

export default CompanyTable
