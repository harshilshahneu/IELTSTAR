import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from "@mui/material/Avatar";

export default function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  const user = props.user;
  console.log(user);

  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}> */}
      
        <Avatar alt="USER" src={user.picture} onClick={handleClick} aria-describedby={id} variant="contained"/>
      {/* </Button> */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div>
        <Typography sx={{ p: 2 }}>Hello, {props.user.nickname}</Typography>
        <a href="/api/auth/logout">
        <Button>Sign Out</Button>
        </a>
        
        </div>
        

      </Popover>
    </div>
  );
}
