//@ts-nocheck

import { Request, Response } from "express";
import { Client } from "podcast-api";
import { parseString } from "xml2js";
import axios from "axios";
import { json } from "stream/consumers";

// const client = Client({ apiKey: process.env.LISTENNOTES_API_Key });
const getTrendingPodcast = async (req: Request, res: Response) => {
  axios({
    method: "get",
    url: "https://storage.googleapis.com/podcastemodata/hello.txt", // Replace with your URL
    responseType: "stream",
  })
    .then((response) => {
      let rawData = ""; // To accumulate chunks

      response.data.on("data", (chunk: any) => {
        rawData += chunk; // Append each chunk of data to rawData
      });

      response.data.on("end", () => {
        try {
          const bestPodcastsMetadata = JSON.parse(rawData); // Convert the complete data to JSON
          const twentyPodcastObjects = bestPodcastsMetadata.podcasts;
          const rssFeedUrls = twentyPodcastObjects.map((podcast) => {
            return podcast.rss;
          });
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching stream:", error);
    });
};

export default getTrendingPodcast;
