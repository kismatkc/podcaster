"use client";
import React, { useEffect } from "react";
import { parseString } from "xml2js";

const Test = () => {
  useEffect(() => {
    const podcastDetails = fetch("https://rss.art19.com/masters-of-scale")
      .then((data) => data.text())
      .then((data) => {
   
        parseString(data,(err,res)=>{
console.log(res);

        })
        return data
      });
   
      
  }, []);

  return (
    <div className="w-full flex text-white-1  items-center justify-center">
      <p>data</p>
    </div>
  );
};

export default Test;
