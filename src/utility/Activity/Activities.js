import React, { Component } from 'react'
import "./Activities.css";
import Activity from './Activity';

export default class Activities extends Component {
    render() {
        const activity=this.props.activities.map((activity,i)=>{
            return   (<div className="col s2" key={i}>
                < Activity activity={activity}  />
            </div>)   
        })
        return (
            <>  
            <h1 className="main-header-text">{this.props.header}</h1>      
            {activity}
            </>
        )
    }
}
