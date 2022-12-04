import styles from "../styles/Landing.module.scss";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import Hero from "../components/LandingPage/Hero";
import Header from "../components/LandingPage/Header";
import Section from "../components/LandingPage/Section";
import AboutUs from "../components/LandingPage/AboutUs";
import Testimonial from "../components/LandingPage/Testimonial";
import Footer from "../components/LandingPage/Footer";
import ContactUs from "../components/LandingPage/ContactUs";
import Image from "next/image";
import backgroungImg from "../images/backgroundImg.jpg";
interface User {
  user: {
    user: object;
  };
}

const Home = () => {
  const user = useSelector((state: User) => state.user.user);
  return (
    <>
      <div className={styles.bgWrap}>
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
