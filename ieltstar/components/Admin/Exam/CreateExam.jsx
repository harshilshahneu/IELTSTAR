import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import axios from "axios";

const CreateExam = ({ data, setData }) => {
  const [loading, setLoading] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    title: "",
    type: "",
    date: "",
  });
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

  return (
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
                id="create-outlined-select-type"
                select
                label="Type"
                defaultValue=""
                value={createFormData.type}
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
  );
};

export default CreateExam;
