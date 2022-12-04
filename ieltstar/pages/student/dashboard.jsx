import { Typography, Container, Grid } from "@mui/material";
import AppWidgetSummary from "../../components/Student/Dashboard/AppWidgetSummary";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "@emotion/react";

const dashboard = () => {
    const theme = useTheme();
  useEffect(() => {
    AOS.init();
  }, [theme.palette.mode]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Reading"
            total={55}
            color="success"
            icon={"fluent-mdl2:reading-mode"}
            data-aos="fade-up"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Listening"
            total={44}
            color="info"
            icon={"grommet-icons:assist-listening"}
            data-aos="fade-up"
            data-aos-delay="200"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Writing"
            total={33}
            color="warning"
            icon={"icon-park-outline:writing-fluently"}
            data-aos="fade-up"
            data-aos-delay="400"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Speaking"
            total={77}
            color="error"
            icon={"iconoir:mic-speaking"}
            data-aos="fade-up"
            data-aos-delay="600"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default dashboard;
