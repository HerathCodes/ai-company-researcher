import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Modal(props) {

    let { query } = props;
    query = "asdasd"
    const [open, setOpen] = useState(true);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const name = formJson.name;
                    const link = formJson.link;
                    console.log(name, link);
                    handleClose();
                }
            }}
        > 
        <DialogTitle>Get the gist of {query}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                To add this company, please fill out the form below. Enter the name of the company and their corporate link.
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="modalName"
                name="modalName"
                label="Company Name"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={query}
                placeholder='company name...'
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                required
                margin="dense"
                id="modalLink"
                name="modalLink"
                label="Corporate Site"
                type="url"
                fullWidth
                variant="standard"
                InputLabelProps={{ shrink: true }}         
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    )
}

export default Modal