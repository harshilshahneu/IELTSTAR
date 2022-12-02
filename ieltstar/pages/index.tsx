import styles from "../styles/Home.module.scss";
import CssBaseline from "@mui/material/CssBaseline";
import Hero from "./../components/Hero";
import Header from "./../components/Header";
import Section from "./../components/Section";
import Testimonial from "./../components/Testimonial";
import ContactUs from "./../components/ContactUs";
import Footer from "./../components/Footer";
import AboutUs from "./../components/AboutUs.js";

import { useSelector } from "react-redux";

interface User {
  user: {
    user: object;
  };
}

const Home = () => {
  const user = useSelector((state: User) => state.user.user);
  return (
    <>
      <div>
        <CssBaseline />
        <Header />
        <Hero />
        <Section />
        <AboutUs />
        <Testimonial />
        <ContactUs />
        <Footer />
      </div>
    </>
  );
};
Home.getLayout = function getLayout(page: any) {
  return <>{page}</>;
};
export default Home;
