import React from 'react'

const PodcastDetails = ({params}: {params: {podcastId: string}}) => {
  return (
    <div className='bg-green-400'>PodcastDetails : {params.podcastId}</div>
  )
}

export default PodcastDetails