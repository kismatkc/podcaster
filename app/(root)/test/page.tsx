"use client";
import React, { useEffect } from "react";
import { parseString } from "xml2js";
const Test = () => {
  useEffect(() => {
    const podcastDetails = fetch("https://rss.art19.com/masters-of-scale")
      .then((data) => data.text())
      .then((data) => {
        parseString(data, (err, res) => {
          const relevantDetails = res.rss.channel;
          const author = relevantDetails[0]["itunes:author"][0];
          const title = relevantDetails[0].title[0];
          const image = relevantDetails[0].image[0].url[0];
        });
        return data;
      });
  }, []);

  return (
    <div className="w-full flex text-white-1  items-center justify-center">
      <p>data</p>
    </div>
  );
};

export default Test;
