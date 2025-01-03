import express, { Router } from "express";
import AuthController from "../controllers/AuthController";

const router: Router = express.Router();

// Define routes
router.route("/login").post(AuthController.login);
router.route("/signup").post(AuthController.createUser);
export default router;
