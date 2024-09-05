"use client"

import React, { useEffect } from "react";
import PodcastDetails from "@/components/podcast-card";
import axios from "axios"
import { API } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
const getBestPodcasts = async () => {
  const data = await API.get("/best_podcasts");

  console.log(data)


  return data;
};

const podcastData = [
  {
   imgURL: "https://megaphone.imgix.net/podcasts/0d8f9f54-48cd-11ee-ab9b-c7fa92fe264e/image/doac-yt-logo.jpg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress",
   title: "The Diary Of A CEO with Steven Bartlett ",
   author: "DOAC" ,
   duration:7993,
   views: 71101
  }
]
const Home = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["bestPodcasts"],
    queryFn: getBestPodcasts
  });
  useEffect(() => {
    
  }, [data])

  return (
    <div className="">
      <h1 className="text-20 font-bold text-white-1">Top four podcasts of the week</h1>
      <div className="podcast_grid">
        {podcastData.map(({ title, author, imgURL, views }) => (
          <PodcastDetails
            key={views}
            title={title}
            author={author}
            imgURL={imgURL}
           
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
