import express from "express";
import * as sendSMS from "../controllers/sms-controller.js";

const Router = express.Router();

Router.route("/:id").post(sendSMS.sendSms);

export default Router;
