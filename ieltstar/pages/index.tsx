import styles from '../styles/Home.module.scss';
import { useSelector } from 'react-redux';

interface User {
  user: {
    user: object
  };
}

export default function Home() {
  const user = useSelector((state: User) => state.user.user);
  console.log(user);
  return (
    <>
     
    </>
  )
}
