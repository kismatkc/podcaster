

import dotenv from "dotenv";
import express from "express";
import CORS from "cors"
import generateAudioRoute from "./routes/generate_audio_route.ts";
import getBestPodcasts from "./routes/get_best_podcasts_route.ts";

dotenv.config();

const app = express();
app.use(CORS())
const PORT = process.env.port; // Corrected environment variable

if (!PORT) {
  throw new Error("Please provide a valid port");
}
app.use("/podcaster/backend", generateAudioRoute);
app.use("/podcaster/backend", getBestPodcasts);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
