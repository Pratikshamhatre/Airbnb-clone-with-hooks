import React from 'react'

export default function Point(props) {
    console.log(props)
    const descObject=props.pointDesc.find(point=>{
        return props.point===point.pointTitle
    })

    console.log(descObject)
    return (
        <div>
            <div className="point-title">
                {props.point}
            </div>
            <div className="point-desc">{descObject.text}</div>
        </div>
    )
}
