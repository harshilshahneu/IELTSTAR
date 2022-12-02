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
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";

const exam = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [createFormData, setCreateFormData] = useState({
    title: "",
    type: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  const handleClickOpen = (id) => {
    setEditFormData(data.find((item) => item._id === id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateData = () => {
    setLoading(true);
    const res = axios
      .put(`http://localhost:8080/exams/${editFormData._id}`, {
        ...editFormData,
        date: new Date(editFormData.date),
      })
      .then((res) => {
        setData(
          data.map((item) =>
            item._id === editFormData._id ? editFormData : item
          )
        );
        setLoading(false);
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };
  const createData = () => {
    setLoading(true);
    axios
      .post(`http://localhost:8080/exams`, {
        ...createFormData,
        date: new Date(createFormData.date),
      })
      .then((res) => {
        setData([...data, res.data]);
        setLoading(false);
        setOpenCreateDialog(false);
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/exams/${id}`)
      .then((res) => {
        setData(data.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/exams")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", margin: "10px" }}>
        {/* //add data button */}
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          color="warning"
          onClick={() => setOpenCreateDialog(true)}
        >
          Create Exam
        </Button>
        <Dialog
          open={openCreateDialog}
          onClose={() => setOpenCreateDialog(false)}
        >
          <DialogTitle>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>Create Exam</Box>
              <Box>
                <IconButton
                  aria-label="cancel"
                  color="error"
                  onClick={() => setOpenCreateDialog(false)}
                >
                  <CancelIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Title"
                  defaultValue={createFormData.title}
                  onChange={(e) =>
                    setCreateFormData({
                      ...createFormData,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <TextField
                  id="outlined-select-type"
                  select
                  label="Type"
                  defaultValue={createFormData.type}
                  onChange={(e) =>
                    setCreateFormData({
                      ...createFormData,
                      type: e.target.value,
                    })
                  }
                  helperText="Please select test type"
                >
                  {["Academic", "General"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div>
                <TextField
                  id="outlined-required"
                  label="Date"
                  type="date"
                  defaultValue={
                    createFormData.date
                      ? new Date(createFormData.date).toISOString().slice(0, 10)
                      : ""
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) =>
                    setCreateFormData({
                      ...createFormData,
                      date: e.target.value,
                    })
                  }
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <LoadingButton
                color="secondary"
                onClick={createData}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
              >
                Save
              </LoadingButton>
            </Stack>
          </DialogActions>
        </Dialog>
      </Box>
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
                    <IconButton
                      aria-label="edit"
                      color="secondary"
                      onClick={() => handleClickOpen(row._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>
                        <Box display="flex" alignItems="center">
                          <Box flexGrow={1}>Edit Exam</Box>
                          <Box>
                            <IconButton
                              aria-label="cancel"
                              color="error"
                              onClick={handleClose}
                            >
                              <CancelIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </DialogTitle>
                      <DialogContent>
                        <Box
                          component="form"
                          sx={{
                            "& .MuiTextField-root": { m: 1, width: "25ch" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <div>
                            <TextField
                              required
                              id="outlined-required"
                              label="Title"
                              defaultValue={editFormData.title}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <TextField
                              id="outlined-select-type"
                              select
                              label="Type"
                              value={editFormData.type}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  type: e.target.value,
                                })
                              }
                              helperText="Please select test type"
                            >
                              {["Academic", "General"].map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                          <div>
                            <TextField
                              id="outlined-required"
                              label="Date"
                              type="date"
                              defaultValue={
                                editFormData.date
                                  ? new Date(editFormData.date)
                                      .toISOString()
                                      .slice(0, 10)
                                  : ""
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  date: e.target.value,
                                })
                              }
                            />
                          </div>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent="flex-end"
                        >
                          <LoadingButton
                            color="secondary"
                            onClick={updateData}
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="outlined"
                          >
                            Save
                          </LoadingButton>
                        </Stack>
                      </DialogActions>
                    </Dialog>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDelete(row._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
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
