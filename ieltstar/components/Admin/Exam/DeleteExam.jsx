import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../store/snackbarSlice";

const DeleteExam = ({ id, data, setData}) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.API_URL}/exams/${id}`)
      .then((res) => {
        setData(data.filter((item) => item._id !== id));
        dispatch(
          openSnackbar({
            message: "Exam Deleted Successfully",
            severity: "success",
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          openSnackbar({
            message: "Error Deleting Exam : " + err.message,
            severity: "error",
          })
        );
      });
  };
  return (
    <IconButton
      aria-label="delete"
      color="error"
      onClick={() => handleDelete(id)}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteExam;
