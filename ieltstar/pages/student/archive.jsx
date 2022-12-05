import { Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import TestCard from "../../components/Student/Archive/TestCard";
import AOS from "aos";
import "aos/dist/aos.css";

const archive = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    AOS.init({
        once: true,
    });
    let endpoints = [
      `${process.env.API_URL}/exams`,
      `${process.env.API_URL}/tests`,
    ];
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((data) => {
      console.log(data);
      const exams = data[0].data;
      let tests = data[1].data;
      console.log("exams : ", exams);

      setData(
        tests.map((test) => {
          return {
            ...test,
            examType: exams.find((exam) => exam._id === test.examId).type,
            title: exams.find((exam) => exam._id === test.examId).title,
            date: exams.find((exam) => exam._id === test.examId).date,
          };
        })
      );
      console.log(tests);
    });
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Select any of the test to get started!
      </Typography>
      <Grid container spacing={3}>
        {data.map((test, index) => (
          <Grid item xs={12} sm={6} md={3} data-aos="fade-in" data-aos-delay={150 * index}>
            <TestCard test={test} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default archive;
