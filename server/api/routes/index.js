//Pass the app to the routes

import questionRouter from "./question-router.js";
import scoreRouter from "./score-router.js";

const routes = (app) => {
  app.use("/questions", questionRouter);
  app.use("/score", scoreRouter);
};

export default routes;
