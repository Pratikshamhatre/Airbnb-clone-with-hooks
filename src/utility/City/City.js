import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import "./City.css"

export default class City extends Component {
    render() {
        const {cityName, image, price,id} = this.props.city;
     
        return (
            <div className="city col s12" >

                <Link to={`/city/${cityName}`} >
                <div className="image">
                    <img src={image} alt={cityName} />

                </div>

                <div className="city-name">
                    {cityName}
                </div>
                <div className="price">
                    ${price}/night average
                </div>
                </Link>
            </div>
        )
    }
}
