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
    section: "",
    category: "",
    source: "",
  });
  const createData = () => {
    setLoading(true);
    axios
      .post(`${process.env.API_URL}/tests`, {
        ...createFormData,
        examId: id
      })
      .then((res) => {
        setCreateFormData({
            section: "",
            category: "",
            source: "",
        });
        setData([...data, res.data]);
        setLoading(false);
        setOpenCreateDialog(false);
        dispatch(
          openSnackbar({
            message: "Test Created Successfully",
            severity: "success",
          })
        );
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          openSnackbar({
            message: "Error Creating Test : " + err.message,
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
        Create Test
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
                type="number"
                id="outlined-required"
                label="Section"
                value={createFormData.section}
                onChange={(e) =>
                  setCreateFormData({
                    ...createFormData,
                    section: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <TextField
                id="create-outlined-select-type"
                select
                label="Category"
                value={createFormData.category}
                onChange={(e) =>
                  setCreateFormData({
                    ...createFormData,
                    category: e.target.value,
                  })
                }
                helperText="Please select test category"
              >
                {["Reading", "Listening", "Writing", "Speaking"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                id="source-outlined"
                label="Source"
                value={createFormData.source}
                multiline
                onChange={(e) =>
                  setCreateFormData({
                    ...createFormData,
                    source: e.target.value,
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
