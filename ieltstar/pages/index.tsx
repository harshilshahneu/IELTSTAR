import styles from "../styles/Landing.module.scss";
import { useSelector } from "react-redux";
import Hero from "../components/LandingPage/Hero";
import Header from "../components/LandingPage/Header";
import Section from "../components/LandingPage/Section";
import AboutUs from "../components/LandingPage/AboutUs";
import Testimonial from "../components/LandingPage/Testimonial";
import Footer from "../components/LandingPage/Footer";
import ContactUs from "../components/LandingPage/ContactUs";

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
