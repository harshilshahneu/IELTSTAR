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
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../store/snackbarSlice";

const CreateExam = ({ id, data, setData }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    title: "",
    description: "",
    options: [],
    type: "",
    answer: "",
    marks: "",
  });
  const createData = () => {
    setLoading(true);
    axios
      .post(`${process.env.API_URL}/tests/${id}/questions`, createFormData)
      .then((res) => {
        setCreateFormData({
          title: "",
          description: "",
          options: [],
          type: "",
          answer: "",
          marks: "",
        });
        setData([...data, res.data.questions]);
        setLoading(false);
        setOpenCreateDialog(false);
        dispatch(
          openSnackbar({
            message: "Question Added Successfully",
            severity: "success",
          })
        );
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          openSnackbar({
            message: "Error Adding Question : " + err.message,
            severity: "error",
          })
        );
      });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: "10px" }}>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        color="warning"
        onClick={() => setOpenCreateDialog(true)}
      >
        Add a Question
      </Button>
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>Create Test</Box>
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
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-title"
                label="Title"
                value={createFormData.title}
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
                id="outlined-description"
                label="Description"
                value={createFormData.description}
                onChange={(e) =>
                  setCreateFormData({
                    ...createFormData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <TextField
                id="outlined-options"
                label="Options"
                value={createFormData.options[0]}
                onChange={(e) =>
                  setCreateFormData({
                    ...createFormData,
                    options: [e.target.value],
                  })
                }
              />
            </div>
            <div>
              <TextField
                id="outlined-type"
                label="Type"
                value={createFormData.type}
                onChange={(e) =>
                  setCreateFormData({
                    ...createFormData,
                    type: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <TextField
                id="outlined-answer"
                label="Answer"
                value={createFormData.answer}
                onChange={(e) =>
                  setCreateFormData({
                    ...createFormData,
                    answer: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <TextField
                id="outlined-marks"
                label="Marks"
                type="number"
                value={createFormData.marks}
                onChange={(e) =>
                  setCreateFormData({
                    ...createFormData,
                    marks: e.target.value,
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
