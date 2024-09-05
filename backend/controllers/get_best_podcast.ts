//@ts-nocheck

import { Request, Response } from "express";
import { Client } from "podcast-api";
import { parseString } from "xml2js";
import axios from "axios";
// const client = Client({ apiKey: process.env.LISTENNOTES_API_Key });
const getTrendingPodcast =async (req: Request, res: Response) => {
  
let data = {}
axios({
  method: 'get',
  url: "https://storage.googleapis.com/podcastemodata/hello.txt", // Replace with your URL
  responseType: 'stream'
})
.then(response => {
  let rawData = ''; // To accumulate chunks

  response.data.on('data', (chunk: any) => {
    rawData += chunk; // Append each chunk of data to rawData
  });

  response.data.on('end', () => {
    try {
      const jsonObject = JSON.parse(rawData); // Convert the complete data to JSON
      data = jsonObject;
      console.log(data)
      
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });

})
.catch(error => {
  console.error('Error fetching stream:', error);
});

  

   
  // client
  //   .fetchBestPodcasts({
  //     genre_id: "93",
  //     page: 2,
  //     region: "us",
  //     sort: "listen_score",
  //     safe_mode: 0,
  //   })
  //   .then((response) => {
  //     const bestPodcasts = response.data.podcasts;
      
  //     res.json(podcastXmlData);
  //   })
  //   .catch((error) => {
  //     res.json(error);
  //   });

  
  res.send(data);
  return data;
};

export default getTrendingPodcast;
