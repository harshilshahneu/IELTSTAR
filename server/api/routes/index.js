//Pass the app to the routes

import questionRouter from "./question-router.js";
const routes = (app) => {
  app.use("/", questionRouter);
};

export default routes;
