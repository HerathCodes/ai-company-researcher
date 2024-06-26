import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
function Navbar() {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (path) => {
        // console.log(path);
        setAnchorEl(null);
        navigate(path);
    };
    return (
        <div className="pull-forward">
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleClose("/")}>Home</MenuItem>
                <MenuItem onClick={() => handleClose("/register")}>Register</MenuItem>
                <MenuItem onClick={() => handleClose("/login")}>Login</MenuItem>
                <MenuItem onClick={() => handleClose("/admin")}>Admin</MenuItem>
            </Menu>
        </div>
    );
}

export default Navbar