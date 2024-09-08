//@ts-nocheck

import { Request, Response } from "express";
import { Client } from "podcast-api";
import { parseStringPromise } from "xml2js";
import axios from "axios";
import { json } from "stream/consumers";

function podcastCard(xmlData: any) {
  const { rss } = xmlData;
  const { channel } = rss;
  const channelData = channel[0];
  const podcastData = channelData.item[0];

  const podcastTitle = channelData.title[0];
  const podcastImage = channelData.image[0].url[0];
  const podcastAuthor = channelData["itunes:author"][0];
  const podcastDuration = podcastData["itunes:duration"][0];
  const podcastViews = Math.ceil(Math.random() * 100000);
  return {
    title: podcastTitle,
    author: podcastAuthor,
    imgURL: podcastImage,
    views: podcastViews,
    duration: podcastDuration
  };
}
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
          const xmlDataResponses = rssFeedUrls.map(async (url: string) => {
            const response = await fetch(url);

            const xmlDataInStringFormat = await response.text();

            return xmlDataInStringFormat;
          });
          const xmlResponsesToXmlData: string[] = async (
            xmlDataResponses: Promise[]
          ) => {
            const xmlData = await Promise.all(xmlDataResponses);
            const xmlObjectResponses = xmlData.map(async (xmlText) => {
              const xmlObject = await parseStringPromise(xmlText);
              return xmlObject;
            });
            const xmlObjects = await Promise.all(xmlObjectResponses);
            const podcastCardDetails = xmlObjects.map((XmlObject) => {
              try {
                return podcastCard(XmlObject);
              } catch (error) {}
            });

            res.send(podcastCardDetails);
          };

          xmlResponsesToXmlData(xmlDataResponses);
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
