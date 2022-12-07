import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [isStart, setIsStart] = React.useState(false);
  let scores = props.scores;
  const [phone, setPhone] = React.useState('+1');

  // Handle Open to open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle Close to close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle Send to set isStart true for sending in useEffect
  const handleSend = () => {
    setIsStart(true);
    console.log(isStart);
  };

  // Handle change for setting phone number from textfield value
  const handleChange = (event) => {
    setPhone(event.target.value);
  };
  const { user } = useUser();
  useEffect(() => {
    console.log(isStart);
    console.log(phone);
    // Send SMS if isStart is true
    if (isStart) {
      sendSms(user, scores);
      setIsStart(false);
      setOpen(false);
    }
  }, [isStart || '']);

  /**
     * Function to Send Score via SMS from API
     * @param {user} user - LoggedIn User 
     * @param {scores} user - LoggedIn User 
     * 
     */
  const sendSms = (user, scores) => {
    if (user) {
      axios
        .post(`${process.env.API_URL}/sms/${phone}`, {
          phonenumber: phone,
          email: user.email,
          name: user.given_name || user.nickname,
          picture: user.picture,
          scores: scores[0]
        })
        .then((res) => {
          console.log(res);
          console.log("SMS SEND SUCCESSFULLY");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        SEND SCORE VIA PHONE NUMBER
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Score</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To send score via phone number, please enter your phone number here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone Number"
            type="text"
            fullWidth
            variant="standard"
            value={phone} 
            onChange={handleChange}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}