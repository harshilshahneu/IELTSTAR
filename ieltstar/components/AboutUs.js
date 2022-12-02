import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import bestTeams from "./../images/bestTeams.jpeg";

const AboutUs = () => {
  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <img src={bestTeams} alt="My Team" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={700}>
            We build, We revive
          </Typography>
          <Typography>
            Your business needs to be in safe hands at all times. We ensure you
            never run out of customers and not run at loss. We are trusted by
            over 500+ companies to deliver quality marketing campaigns using
            Digital marketing & Offline marketing channels.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "200px", fontSize: "16px" }}
          >
            CONTACT US
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
