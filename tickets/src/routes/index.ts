import epxress from "express";
import { body } from "express-validator";
import {
  currentUserMiddleware,
  validateRequestMiddleware,
  requireAuthMiddleware,
} from "@ammarahmad/common";
import {
  newTicketController,
  showAllTicketController,
  showSingleTicketController,
  updateSingleTicketController,
} from "../controllers";
const ticketsRouter = epxress.Router();

ticketsRouter.post(
  "/api/tickets",
  requireAuthMiddleware,
  [
    body("title").not().isEmpty().withMessage("Title is required."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0."),
  ],
  validateRequestMiddleware,
  newTicketController
);

ticketsRouter.get("/api/tickets", showAllTicketController);

ticketsRouter.get("/api/tickets/:id", showSingleTicketController);

ticketsRouter.put(
  "/api/tickets/:id",
  requireAuthMiddleware,
  [
    body("title").not().isEmpty().withMessage("Title is required."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0."),
  ],
  validateRequestMiddleware,
  updateSingleTicketController
);
export default ticketsRouter;
