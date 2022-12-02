import { useEffect, useState } from "react";
import Admin from "../../components/Layout/Admin";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import formatDate from "../../utils/formatDate";
import Stack from "@mui/material/Stack";
import CreateExam from "../../components/Admin/Exam/CreateExam";
import UpdateExam from "../../components/Admin/Exam/UpdateExam";
import DeleteExam from "../../components/Admin/Exam/DeleteExam";

const exam = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/exams")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <CreateExam data={data} setData={setData} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="questions crud table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">
                  {formatDate(new Date(row.date))}
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <UpdateExam id={row._id} data={data} setData={setData} />
                    <DeleteExam id={row._id} data={data} setData={setData} />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

exam.getLayout = function getLayout(page) {
  return <Admin>{page}</Admin>;
};

export default exam;
