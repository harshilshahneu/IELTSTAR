import { useEffect, useState } from 'react'
import Admin from '../../components/Layout/Admin'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const reading = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8080/questions')
        .then(response => setData(response.data))
  }, [])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="questions crud table">
        <TableHead>
          <TableRow>
            <TableCell>Question Title</TableCell>
            <TableCell align="right">Question Description</TableCell>
            <TableCell align="right">Question Type</TableCell>
            <TableCell align="right">Options</TableCell>
            <TableCell align="right">Answer</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.questionTitle}
              </TableCell>
              <TableCell align="right">{row.questionDescription}</TableCell>
              <TableCell align="right">{row.questionType}</TableCell>
              <TableCell align="right">{row.questionOptions}</TableCell>
              <TableCell align="right">{row.correctAnswer}</TableCell>
              <TableCell align="right">

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

reading.getLayout = function getLayout(page) {
  return (
    <Admin>
      {page}
    </Admin>
  )
}
    

export default reading