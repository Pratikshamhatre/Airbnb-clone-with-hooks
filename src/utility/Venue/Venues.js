import React from 'react'
import Venue from './Venue'


export default function Venues(props) {


    const venue=props.venues.map((venue,i)=>{
      return (
        <div className="col s3" key={i}>
      <Venue venue={venue} />

      </div>
      )
      
    })
    return (
        <>
            <h1 className="main-header-text">{props.header}</h1>
            
            {venue}

        </>
    )
}
