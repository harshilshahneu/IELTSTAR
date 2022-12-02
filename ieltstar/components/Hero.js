import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import myteam from "./../images/myteam.jpeg";

const Hero = () => {
  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700}>
            Let's scale your business
          </Typography>
          <Typography variant="h6">
            Hire professionals who will help your business make 10X your
            previous income. With over 5years experience in Marketing & Business
            strategy, we are your best client.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "200px", fontSize: "16px" }}
          >
            HIRE US
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={myteam} alt="My Team" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
