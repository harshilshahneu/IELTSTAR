import styles from '../styles/Home.module.scss'
import Head from 'next/head'
import TopBar from '../components/Navigation/TopBar';


export default function Home() {
  return (
    <>
      <Head>
        <title>IELTSTAR</title>
        <meta name="description" content="Online platform to practice IELTS test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TopBar />
      </main>
    </>
  )
}
