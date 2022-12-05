import express from "express";
import * as sendSMS from "../controllers/sms-controller.js";

const Router = express.Router();

Router.route("/").post(sendSMS.getExams);
// Router.post("/", sendEmail);

export default Router;
