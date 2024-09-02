

import { Router } from "express";
import generateAudio from "../controllers/generate_audio.ts";

const router = Router();

router.get("/generate_audio", generateAudio);

export default router;
