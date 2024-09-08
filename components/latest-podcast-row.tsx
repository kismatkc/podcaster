import React from "react";
import { Headphones, Clock, Ellipsis } from "lucide-react";
import { NumericFormat } from "react-number-format";

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
    <div className="flex items-center justify-between mb-9">
      <span className="text-white-1 text-16 font-bold  w-[20px] flex justify-center items-center">
        {index}
      </span>
      <figure className="flex items-center gap-2  w-[280px] justify-start">
        <img
          src={imgURL}
          alt={`${author} image`}
          className="w-[50.65px] h-[54px]"
        />
        <figcaption className="text-white-1 text-14 font-bold">
          {author}
        </figcaption>
      </figure>
      <div className="flex items-center gap-2 text-white-1 text-14 font-bold ">
        <Headphones />
        <NumericFormat value={views} displayType="text" thousandSeparator />
      </div>
      <div className="flex items-center gap-2 text-white-1 text-14 font-bold ">
        <Clock />
        <span>{duration}</span>
      </div>
      <Ellipsis className="text-white-1 text-14 font-bold cursor-pointer " />
    </div>
  );
};

export default LatestPodcastIndividualRow;
