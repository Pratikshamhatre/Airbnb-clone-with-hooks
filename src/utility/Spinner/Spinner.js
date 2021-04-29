import {library} from '@fortawesome/fontawesome-svg-core'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import "./Spinner.css"
library.add(faSpinner)

export default class Spinner extends Component {
    render() {
        return (
            <div className="spinner-wrapper">
                    <FontAwesomeIcon icon="spinner" size="6x" spin/>
                </div>

        )
    }
}
