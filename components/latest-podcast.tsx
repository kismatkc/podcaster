import React from "react";
import { Headphones, Clock, Ellipsis } from "lucide-react";

const LatestPodcastIndividualRow = ({
  index,
  imgURL,
  duration,
  views,
  author,
}: {
  index: number;
  imgURL: string;
  duration: string;
  views: string;
  author: string;
}) => {
  return (
    <div className="flex">
      <span>{index}</span>
      <figure>
        <img src={imgURL} alt={`${author} image`} />
        <figcaption>{author}</figcaption>
      </figure>
      <div>
        <Headphones />
        <span>{views}</span>
      </div>
      <div>
        <Clock />
        <span>{duration}</span>
      </div>
      <Ellipsis />
    </div>
  );
};

export default LatestPodcastIndividualRow;
