import express from "express";
import * as questionsController from "./../controllers/questions-controller.js";

const router = express.Router();
/**
 * GET/POST Routes created using questions/
 */
router
  .route("/")
  .post(questionsController.post)
  .get(questionsController.index);

/**
 * GET/POST/DELTE Route created using questions/id
 */
router
  .route("/:id")
  .get(questionsController.get)
  .put(questionsController.update)
  .delete(questionsController.remove);

export default router;
