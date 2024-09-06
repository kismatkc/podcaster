"use client";

import React, { useEffect } from "react";
import PodcastDetails from "@/components/podcast-card";
import axios from "axios";
import { API } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import test from "node:test";
import Error from "./enableOnProductionerror";
type podcastCardProps = {
  title: string;
  author: string;
  imgURL: string;
  views: string;
};
const getBestPodcasts = async () => {
  const response = await API.get("/best_podcasts");
  const data: podcastCardProps[] = response.data;
  const validData = data.filter((podcast: podcastCardProps) => podcast != null);

  return validData;
};

const Home = () => {
  const { data, error, isLoading } = useQuery<podcastCardProps[]>({
    queryKey: ["bestPodcasts"],
    queryFn: getBestPodcasts,
  });

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center text-white-1">
        <Loader2 size={35} className="animate-spin" />
      </div>
    );
  if (error) {
    return <Error error={error} />;
  }
  return (
    <div className="">
      <h1 className="text-20 font-bold text-white-1">
        Top four podcasts of the week
      </h1>
      <div className="podcast_grid">
        {data &&
          data.map(({ title, author, imgURL, views }) => (
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
