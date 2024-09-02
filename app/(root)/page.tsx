"use client"
import React, { useEffect } from "react";
import { podcastData } from "@/constants/index";
import PodcastDetails from "@/components/podcast-card";
import { API } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
const getBestPodcasts = async () => {
  const response = await API.get("/best_podcasts");
  const data = response.data;
  console.log(data);
  
  return data;
};
const Home = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["bestPodcasts"],
    queryFn: getBestPodcasts
  });

  return (
    <div className="">
      <h1 className="text-20 font-bold text-white-1">Trending podcast</h1>
      <div className="podcast_grid">
        {podcastData.map(({ title, description, imgURL, id }) => (
          <PodcastDetails
            key={id}
            title={title}
            description={description}
            imgURL={imgURL}
            podcastId={id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
