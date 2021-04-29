import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./Venue.css";
import { fadeIn } from 'react-animations'

import Radium, {StyleRoot} from 'radium';

export default class Venue extends Component {
    render() {

        const {title, imageUrl, pricePerNight, rating, id, location} = this.props.venue;
        const style={
            marginBottom:'20px'
        }
        return (
            <div className="venue col s12" style={style}>
                

                <Link to={`/venue/${id}`} >
                    <div className="image">
                        <img src={imageUrl} alt={title} />

                    </div>

                    <div className="row">
                        <div className="col s9 location">

                            {location}
                        </div>

                        <div className="col s3">

                            <i className="material-icons" style={{color: "red", fontSize: "15px"}}>star</i>
                            {rating}
                        </div>
                    </div>

                    <div className="title">
                        {title}
                    </div>
                    <div className="price">
                        ${pricePerNight}/night
            </div>


                </Link>
            </div>
        )
    }
}
