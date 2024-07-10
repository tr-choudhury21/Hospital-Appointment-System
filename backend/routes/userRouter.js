import express from "express";
import { addNewAdmin, login, patientRegister } from "../controller/userController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/new", isAdminAuthenticated, addNewAdmin);

export default router;