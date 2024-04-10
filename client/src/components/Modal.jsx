import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Modal(props) {


    const { open, handleModal, query, handleQuerySubmit, handleCompanyUpdate } = props;

    const handleClose = () => {
      handleModal(false);
    };
  
    // const handleClose = () => {
    //   setOpen(false);
    // };

    async function scrapeCompany(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const Name = formJson.name;
        const Site = formJson.site;
        console.log(Name, Site);
        const response = await fetch('http://localhost:3000/api/companies/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name, Site })
        });
        console.log(response.status);
        if (response.status === 200) {
            const data = await response.json();
            createCompany(data);
        } else {
            console.error('Failed to scrape company:', response.statusText);
        }
    }

    async function createCompany(data) {
        const { Name, Summary, Site, Links } = data;
        const response = await fetch('http://localhost:3000/api/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name,
                Summary,
                Site,
                Links
            })
        })
        if (response.status === 200) {
            const company = await response.json();
            handleQuerySubmit(company);
            handleCompanyUpdate(true);
        } else {
            console.error('Failed to create company:', response.statusText);
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        scrapeCompany(event);
                        handleClose();
                    }
                }}
            > 
            <DialogTitle>Get the gist!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To add this company, please fill out the form below. Enter the name of the company and their corporate link.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="modalName"
                    name="name"
                    label="Company Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={query.Name}
                    placeholder='Company Name'
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    required
                    margin="dense"
                    id="modalSite"
                    name="site"
                    label="Corporate Site"
                    type="url"
                    fullWidth
                    variant="standard"
                    placeholder="https://www.example.com"
                    InputLabelProps={{ shrink: true }}         
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
    )
}

export default Modal