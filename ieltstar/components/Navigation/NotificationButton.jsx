import React from 'react';
import { IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

const NotificationButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
        <IconButton onClick={handleClick}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        TransitionComponent={Fade}
        >
            <MenuItem onClick={handleClose}>Some</MenuItem>
            <MenuItem onClick={handleClose}>Random</MenuItem>
            <MenuItem onClick={handleClose}>Notifications</MenuItem>
        </Menu>
    </>
  )
}

export default NotificationButton