import styles from '../styles/Home.module.scss'
import Head from 'next/head'
import TopBar from '../components/Navigation/TopBar';
import SideBar from '../components/Navigation/SideBar';

export default function Home() {
  return (
    <>
      <Head>
        <title>IELTSTAR</title>
        <meta name="description" content="Online platform to practice IELTS test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="app">
      <SideBar />
      <main className="content">
        <TopBar />
       
      </main>
      </div>
    </>
  )
}
