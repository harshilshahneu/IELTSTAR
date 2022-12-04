import React from "react";
import { Box, Typography, Link } from "@mui/material";
import styles from "../../styles/Landing.module.scss";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <Box sx={{ flexGrow: 1 }} className={styles.footerContainer}>
      <Typography className={styles.footerText}>
        Provided by{" "}
        <Link href="https://appseed.us" target="_blank" underline="none">
          Northeastern
        </Link>
      </Typography>
      <Typography className={styles.footerDate}>HuskyBytes</Typography>
    </Box>
  );
};

export default Footer;
