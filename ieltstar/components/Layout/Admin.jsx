import TopBar from '../Navigation/TopBar'
import AdminSideBar from '../Navigation/AdminSideBar'
import Head from 'next/head'
import { Box } from '@mui/material'

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
        <Box style={{padding: "10px"}} >
          { children }
        </Box>
      </main>
      </div>
    </>
  )
}

export default Admin