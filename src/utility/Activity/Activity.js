import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import "./Activity.css"
export default class Activity extends Component {
    render() {

        const {activityType, title, image, cost, rating, totalRatings,id} = this.props.activity
        return (
            <div className="activity col s12">

                <Link to={`/activity/${id}`}>
                <img src={image} alt={title} height="100%" width="100%" />
                <div className="type">
                    {activityType}
                </div>

                <div className="title">
                    {title}
                </div>


                <div className="cost">
                    From ${cost}/person
                </div>

                <div className="rating">
                    <i className="material-icons">star</i>
                    {rating}({totalRatings})
                </div>
                </Link>
            </div>
        )
    }
}
