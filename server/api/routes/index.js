//Pass the app to the routes

import questionRouter from "./question-router.js";
const routes = (app) => {
  app.use("/questions", questionRouter);
};

export default routes;
