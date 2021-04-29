import React from 'react'
import City from './City'
import Slider from '../Slider/Slider'
export default function Cities(props) {
    const cities = props.cities.map((city, i) => {
        return (<div className="col s3" key={i}>
            <City city={city} />
        </div>)
    })
    // )
    return (<div className="cities-wrapper">
        <h1 className="main-header-text">{props.header}</h1>
        <Slider elements={cities} />
    </div>)
}
