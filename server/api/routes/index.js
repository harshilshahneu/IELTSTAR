//Pass the app to the routes
import scoreRouter from "./score-router.js";
import examRouter from "./exam-router.js";
import testRouter from "./test-router.js";

const routes = (app) => {
  app.use("/score", scoreRouter);
  app.use("/exams", examRouter);
  app.use("/tests", testRouter);
};

export default routes;
