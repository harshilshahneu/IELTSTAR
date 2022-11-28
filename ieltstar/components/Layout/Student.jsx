import TopBar from '../Navigation/TopBar'
import SideBar from '../Navigation/SideBar'
import Head from 'next/head'

const Student = ({ children }) => {
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
        { children }
      </main>
      </div>
    </>
  )
}

export default Student