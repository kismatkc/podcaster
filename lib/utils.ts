//@ts-nocheck
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

import { parseString } from "xml2js";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API = axios.create({
  baseURL: "http://localhost:4000/podcaster/backend",
  // baseURL: "https://c0296fc4-ebf6-4ddc-a763-1eb63ee66846-00-4dkh21bryj5d.janeway.replit.dev:3000/podcaster/backend",
});

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
}

function rssFeedUrls(bestPodcasts) {
  const twentyPodcastObjects = bestPodcasts.podcasts;
  const rssFeedUrls = twentyPodcastObjects.map((podcast) => {
    return podcast.rss;
  });
  return rssFeedUrls;
}

function feedUrlToXml(urlsArray) {
  const test = urlsArray.map(async (url) => {
    async function fetchXmlData(url) {
      const response = await fetch(url);
      const xmlData = response.ok;

      return xmlData;
    }
    const oks = await fetchXmlData(url);
    return oks;
  });
  return test;
}
