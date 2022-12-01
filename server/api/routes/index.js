//Pass the app to the routes

import questionRouter from "./question-router.js";
import scoreRouter from "./score-router.js";
import examRouter from "./exam-router.js";

const routes = (app) => {
  app.use("/questions", questionRouter);
  app.use("/score", scoreRouter);
  app.use("/exams", examRouter);
};

export default routes;
