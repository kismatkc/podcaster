import React from 'react'
import Image from 'next/image'
type TopFourPodcastCardProps ={
  title: string;
author: string
  imgURL: string;
}
//console

const TopFourPodcastCard = ({title,author,imgURL}: TopFourPodcastCardProps) => {
  return (
    <div className='cursor-pointer'>
    <figure>
    <Image src={imgURL} alt={title} width={174} height={174} className="w-full aspect-square h-full rounded-xl"/>
    </figure>
      <figcaption>
      <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
        <h2 className="truncate capitalize text-12 text-white-4">{author}</h2>
      </figcaption>
    
    </div>
  )
}

export default TopFourPodcastCard