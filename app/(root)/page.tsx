"use client";

import React, { useEffect } from "react";
import PodcastDetails from "@/components/podcast-card";
import axios from "axios";
import { API } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Error from "./enableOnProductionerror";
import Link from "next/link";
import LatestPodcastIndividualRow from "@/components/latest-podcast";
type podcastCardProps = {
  title: string;
  author: string;
  imgURL: string;
  views: string;
  duration: string;
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

  const trendingPodcast = data?.slice(0, 4);

  const bestPodcast = data?.slice(4, 8);
  const latestPodcast = data?.slice(8, 12);

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
    <div className="flex-col gap-3">
      <div>
        <h1 className="text-20 font-bold text-white-1 mb-2">
          Trending podcast
        </h1>
        <div className="podcast_grid">
          {trendingPodcast &&
            trendingPodcast.map(({ title, author, imgURL, views }) => (
              <PodcastDetails
                key={views}
                title={title}
                author={author}
                imgURL={imgURL}
              />
            ))}
        </div>
      </div>
      <div className="flex-col">
        <div className="flex justify-between">
          <h1 className="text-white-1">Latest Podcast</h1>
          <Link href="" className="text-orange-1">
            See all
          </Link>
        </div>
        <div className="flex-col">
          {latestPodcast?.map(({ imgURL, author, views, duration }, index) => (
            <LatestPodcastIndividualRow
              index={index}
              imgURL={imgURL}
              author={author}
              views={views}
              duration={duration}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-20 font-bold text-white-1 mb-2">Best podcast</h1>
        <div className="podcast_grid">
          {bestPodcast &&
            bestPodcast.map(({ title, author, imgURL, views }) => (
              <PodcastDetails
                key={views}
                title={title}
                author={author}
                imgURL={imgURL}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
