import { Typography, Container, Grid } from "@mui/material";
import AppWidgetSummary from "../../components/Student/Dashboard/AppWidgetSummary";
import SectionWiseComparisonChart from "../../components/Student/Dashboard/SectionWiseComparisonChart";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "@emotion/react";
import TestTimeline from "../../components/Student/Dashboard/TestTimeline";

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

        <Grid item xs={12} md={6} lg={8}>
          <SectionWiseComparisonChart
            title="Section Wise Comparison"
            subheader="This is a comparison of your performance in each section from all the tests you have taken"
            chartLabels={[
              "01/01/2003",
              "02/01/2003",
              "03/01/2003",
              "04/01/2003",
              "05/01/2003",
              "06/01/2003",
              "07/01/2003",
              "08/01/2003",
              "09/01/2003",
              "10/01/2003",
              "11/01/2003",
            ]}
            chartData={[
              {
                name: "Reading",
                type: "area",
                fill: "gradient",
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              },
              {
                name: "Listening",
                type: "area",
                fill: "gradient",
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
              },
              {
                name: "Writing",
                type: "area",
                fill: "gradient",
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
              },
              {
                name: "Speaking",
                type: "area",
                fill: "gradient",
                data: [10, 75, 26, 90, 35, 35, 64, 52, 59, 86, 99],
              },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
            <TestTimeline
              title="Recent Tests Taken"
              list={[...Array(5)].map((_, index) => ({
                id: index,
                title: [
                  'IELTS Academic Test Dec 2021',
                  'IELTS Academic Test Aug 2021',
                  'IELTS Academic Test Mar 2021',
                  'IELTS Academic Test Dec 2020',
                  'IELTS Academic Test Aug 2020',
                ][index],
                type: `order${index + 1}`,
                time: new Date().toLocaleDateString(),
              }))}
            />
          </Grid>
      </Grid>
    </Container>
  );
};

export default dashboard;
