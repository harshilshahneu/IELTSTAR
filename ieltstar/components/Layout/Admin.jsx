import TopBar from '../Navigation/TopBar'
import AdminSideBar from '../Navigation/AdminSideBar'
import Head from 'next/head'

const Admin = ({ children }) => {
  return (
    <>
      <Head>
        <title>IELTSTAR admin panel</title>
        <meta name="description" content="Online platform to practice IELTS test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="app">
      <AdminSideBar />
      <main className="content">
        <TopBar />
        { children }
      </main>
      </div>
    </>
  )
}

export default Admin