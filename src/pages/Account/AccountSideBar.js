import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class AccountSideBar extends Component {
    state = {
        pastBookings: [],
        upcomingBookings: [],
    }

    render() {
        return (
            <div>
                  <ul className="sidenav sidenav-fixed">
                <li>
                    <div className="user-view valign-wrapper center-align">
                        <img className="" src="https://airbnb-clone-prexel-images.s3.amazonaws.com/genericAvatar.png" />
                    </div>
                </li>
                <li>
                    <Link to="/account/reservations/confirmed">Confirmed Reservations</Link>
                </li>
                <li>
                    <Link to="/account/reservations/past">Past Reservations</Link>
                </li>
                <li>
                    <Link to="/account/change-pass">Change Password</Link>
                </li>
            </ul>
            </div>
        )
    }
}
