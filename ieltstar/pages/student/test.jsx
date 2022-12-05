import QuestionsView from "../../components/TestComponents/QuestionsView/QuestionView";
import Reading from "../../components/TestComponents/QuestionsView/Quiz_Writing";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Fab } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useTheme } from "@mui/material/styles";
import {Box} from "@mui/material";

export default function test() {
  const handle = useFullScreenHandle();
  const theme = useTheme();

  return (
    <div>
      <FullScreen handle={handle}>
        <Box sx={{background: theme.palette.mode === "dark" ? "": "white", height: "100%"}}>
          <QuestionsView></QuestionsView>
        </Box>
      </FullScreen>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handle.enter}
        sx={{
          position: "fixed",
          bottom: 26,
          right: 26,
        }}
      >
        <FullscreenIcon />
      </Fab>
    </div>
  );

  //Create a test ID while starting test
  //After submitting: score ID
}
