import React from 'react'
import {podcastData} from "@/constants/index"
import PodcastDetails from "@/components/podcast-card"
const Home = () => {
  return (
    <div className=''>
      <h1 className="text-20 font-bold text-white-1">Trending podcast</h1>
      <div className="podcast_grid">
        {
          podcastData.map(({title,description,imgURL,id})=> <PodcastDetails key={id} title={title} description={description} imgURL={imgURL} podcastId={id} />)
        }
      </div>
      
        
      
      </div>
  )
}

export default Home