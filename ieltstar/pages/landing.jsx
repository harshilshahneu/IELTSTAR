import styles from "../styles/Landing.module.scss";
import Hero from "../components/LandingPage/Hero";
import Header from "../components/LandingPage/Header";
import Section from "../components/LandingPage/Section";
import AboutUs from "../components/LandingPage/AboutUs";
import Testimonial from "../components/LandingPage/Testimonial";
import Footer from "../components/LandingPage/Footer";
import ContactUs from "../components/LandingPage/ContactUs";

const Landing = () => {
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
Landing.getLayout = function getLayout(page) {
  return <>{page}</>;
};
export default Landing;
