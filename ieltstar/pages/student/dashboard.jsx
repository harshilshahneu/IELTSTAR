import { Typography, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Iconify from "../../components/Iconify";
import AOS from "aos";
import "aos/dist/aos.css";
import AppWidgetSummary from "../../components/Student/Dashboard/Summary";
import SectionWiseComparisonChart from "../../components/Student/Dashboard/SectionWiseComparisonChart";
import Leaderboard from "../../components/Student/Dashboard/Leaderboard";
import TestTimeline from "../../components/Student/Dashboard/TestTimeline";
import SuggestedStudyMaterial from "../../components/Student/Dashboard/SuggestedStudyMaterial";
import BoltIcon from '@mui/icons-material/Bolt';
import Box from "@mui/material/Box";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

const dashboard = () => {
  const user = useUser().user;
  const [userData, setUserData] = useState({});
  const [summary, setSummary] = useState({
    reading: 0,
    listening: 0,
    writing: 0,
    speaking: 0,
  });

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  useEffect(() => {
    if (user) {
      axios.get(`${process.env.API_URL}/students/email/${user.email}`)
        .then(user => {
          setUserData(user.data);
          user.data.testHistory.forEach(test => {
            console.log(test.score)
            if(test.testType === "Reading")
              setSummary(prev => ({...prev, reading: prev.reading + test.score}))
            if(test.testType === "Listening")
              setSummary(prev => ({...prev, listening: prev.listening + test.score}))
            if(test.testType === "Writing")
              setSummary(prev => ({...prev, writing: prev.writing + test.score}))
            if(test.testType === "Speaking")
              setSummary(prev => ({...prev, speaking: prev.speaking + test.score}))
          })
          //average the sores
          setSummary(prev => {
            const readingTests = user.data.testHistory.filter(test => test.testType === "Reading").length ? user.data.testHistory.filter(test => test.testType === "Reading").length : 1
            const listeningTests = user.data.testHistory.filter(test => test.testType === "Listening").length ? user.data.testHistory.filter(test => test.testType === "Listening").length : 1
            const writingTests = user.data.testHistory.filter(test => test.testType === "Writing").length ? user.data.testHistory.filter(test => test.testType === "Writing").length : 1
            const speakingTests = user.data.testHistory.filter(test => test.testType === "Speaking").length ? user.data.testHistory.filter(test => test.testType === "Speaking").length : 1

            return {
              reading: prev.reading / readingTests,
              listening: prev.listening / listeningTests,
              writing: prev.writing / writingTests,
              speaking: prev.speaking / speakingTests,
            }
          })

        })
    }
  }, [user]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", alignItems: "center",  mb: 5  }}>
        <Typography variant="h4" sx={{}}>
          Hi, Welcome
        </Typography>
        <BoltIcon fontSize="large" color="warning" />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3} data-aos="fade-up">
          <AppWidgetSummary
            title="Reading"
            total={summary.reading}
            color="success"
            icon={"fluent-mdl2:reading-mode"}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <AppWidgetSummary
            title="Listening"
            total={summary.listening}
            color="info"
            icon={"grommet-icons:assist-listening"}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <AppWidgetSummary
            title="Writing"
            total={summary.writing}
            color="warning"
            icon={"icon-park-outline:writing-fluently"}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <AppWidgetSummary
            title="Speaking"
            total={summary.speaking}
            color="error"
            icon={"iconoir:mic-speaking"}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          lg={8}
          data-aos="fade-up"
          data-aos-delay="800"
        >
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

        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          data-aos="fade-up"
          data-aos-delay="900"
        >
          <TestTimeline
            title="Recent Tests Taken"
            list={[...Array(5)].map((_, index) => ({
              id: index,
              title: [
                "IELTS Academic Test Dec 2021",
                "IELTS Academic Test Aug 2021",
                "IELTS Academic Test Mar 2021",
                "IELTS Academic Test Dec 2020",
                "IELTS Academic Test Aug 2020",
              ][index],
              type: `order${index + 1}`,
              time: new Date().toLocaleDateString(),
            }))}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8} data-aos="fade-in">
          <Leaderboard
            title="Leaderboard"
            subheader="Top 5 students on our platform"
            list={[...Array(5)].map((_, index) => ({
              id: index,
              title: "John Doe",
              description: "IELTS Academic Test Dec 2021",
              image: `/avatars/avatar_${index + 1}.jpg`,
              proficiency: 8.5 - index,
            }))}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4} data-aos="fade-in">
          <SuggestedStudyMaterial
            title="Study Material"
            subheader="Handpicked recommendations for you"
            list={[
              {
                name: "Reading",
                value: "Youtube",
                icon: (
                  <Iconify icon={"uit:youtube"} color="#1877F2" width={32} />
                ),
              },
              {
                name: "Listening",
                value: "BYJU",
                icon: (
                  <Iconify
                    icon={"simple-icons:byjus"}
                    color="#DF3E30"
                    width={32}
                  />
                ),
              },
              {
                name: "Speaking",
                value: "Udemy",
                icon: (
                  <Iconify
                    icon={"logos:udemy-icon"}
                    color="#006097"
                    width={32}
                  />
                ),
              },
              {
                name: "Writing",
                value: "Coursera",
                icon: (
                  <Iconify
                    icon={"academicons:coursera-square"}
                    color="#1C9CEA"
                    width={32}
                  />
                ),
              },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default dashboard;
