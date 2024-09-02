

import { Router } from "express";
import getBestPodcasts from "../controllers/get_best_podcast.ts";

const router = Router();

router.get("/best_podcasts", getBestPodcasts);

export default router;
