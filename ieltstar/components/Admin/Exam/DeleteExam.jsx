import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const DeleteExam = ({ id, data, setData}) => {
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
