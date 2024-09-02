//@ts-nocheck

import { Request, Response } from "express";
import { Client } from "podcast-api";
import { parseString } from "xml2js";

const client = Client({ apiKey: process.env.LISTENNOTES_API_Key });
const getTrendingPodcast = (req: Request, res: Response) => {
  client
    .fetchBestPodcasts({
      genre_id: "93",
      page: 2,
      region: "us",
      sort: "listen_score",
      safe_mode: 0,
    })
    .then((response) => {
      const bestPodcasts = response.data.podcasts;
      const podcastXmlData = bestPodcasts.map(async ({ rss }) => {
        const response = await fetch(rss);
        const podcastXml = await response.data;
        // let author = "",
        //   title = "",
        //   image = "";
        // parseString(podcastXml, (err, res) => {
        //   const relevantDetails = res.rss.channel;
        //   const author = relevantDetails[0]["itunes:author"][0];
        //   const title = relevantDetails[0].title[0];
        //   const image = relevantDetails[0].image[0].url[0];
        //   author = author;
        //   title = title;
        //   image = image;
        // });
        console.log(podcastXml);
      });

      res.json(podcastXmlData);
    })
    .catch((error) => {
      res.json(error);
    });
};

export default getTrendingPodcast;
