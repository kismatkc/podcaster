import React from 'react'
import Image from 'next/image'
type PodcastDetailsProps ={
  title: string;
  description: string;
  podcastId: number;
  imgURL: string;
}

const PodcastDetails = ({title,description,podcastId,imgURL}: PodcastDetailsProps) => {
  return (
    <div className='cursor-pointer'>
    <figure>
    <Image src={imgURL} alt={title} width={174} height={174} className="w-full aspect-square h-full rounded-xl"/>
    </figure>
      <figcaption>
      <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
        <h2 className="truncate capitalize text-12 text-white-4">{description}</h2>
      </figcaption>
    
    </div>
  )
}

export default PodcastDetails