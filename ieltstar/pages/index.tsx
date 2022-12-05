import styles from "../styles/Landing.module.scss";
import { useSelector } from "react-redux";
import Hero from "../components/LandingPage/Hero";
import Header from "../components/LandingPage/Header";
import Section from "../components/LandingPage/Section";
import AboutUs from "../components/LandingPage/AboutUs";
import Testimonial from "../components/LandingPage/Testimonial";
import Footer from "../components/LandingPage/Footer";
import ContactUs from "../components/LandingPage/ContactUs";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

interface User {
  user: {
    user: object;
  };
}

const Home = () => {
  const userSelector = useSelector((state: User) => state.user.user);
  const { user } = useUser();
  const router = useRouter();
  console.log(user);
  if (user) {
    router.push('/student/dashboard');
  }

  return (
    <>
      {!user && (
        <div className={styles.bgWrap}>
          <Header />
          <Hero />
          <Section />
          <AboutUs />
          <Testimonial />
          <ContactUs />
          <Footer />
        </div>
      )}
    </>
  );
};
Home.getLayout = function getLayout(page: any) {
  return <>{page}</>;
};
export default Home;
