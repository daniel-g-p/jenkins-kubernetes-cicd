import { Router } from "express";

import controller from "../controllers/index.js";

const router = Router();

router.get("/health-check", controller.getHealthCheck);

router.get("/", controller.getLogin);

router.post("/", controller.postLogin);

export default router;
