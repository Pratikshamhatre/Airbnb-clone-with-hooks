import axios from 'axios'
import React, {Component} from 'react'
import "./Account.css"
import moment from 'moment';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AccountSideBar from './AccountSideBar';
import Bookings from './Bookings';
import ChangePassword from './ChangePassword';
import {connect} from 'react-redux';
import auth from '../../reducers/authReducer';

class Account extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pastBookings: [],
            upcomingBookings: []
        }
    }



    async componentDidMount() {
        const accountUrl = `${window.apiHost}users/getBookings`;
        const token = this.props.auth.token;
        const data = {
            token: token
        }
        let resp = await axios.post(accountUrl, data);
        console.log(resp)
        let pastBookings=[];
        let upcomingBookings=[]

        resp.data.forEach((booking)=>{
            console.log(booking);
            const today=moment();
            const checkOutDate=moment(booking.checkOut);
            const diffDays=checkOutDate.diff(today,'days');
            console.log(diffDays);
            if(diffDays < 0){
pastBookings.push(booking)
            }
            else{
                upcomingBookings.push(booking)
            }
        })


        console.log(pastBookings,upcomingBookings
            )
        this.setState({
            pastBookings,upcomingBookings
        })

        console.log(this.state)
    }

    render() {

        const {pastBookings,upcomingBookings} =this.state;
        return (
            <div className="account container-fluid">
                <AccountSideBar />

                <div className="row">
                    <div className="col s8 offset-s3">
                        <Route exact path="/account" render={() =>
                            <h1>Choose an option on the left!</h1>

                        } />
                        <Route exact path="/account/reservations/confirmed"  render={()=>
                            <Bookings type="upcoming" bookings={upcomingBookings} token={this.props.auth.token}/>
                        }/>
                        <Route exact path="/account/reservations/past" render={()=>
                            <Bookings type="past" bookings={pastBookings} />
                        } />
                        <Route exact path="/account/change-pass" component={ChangePassword}  token={this.props.auth.token}/>

                    </div>

                </div>
                {/* <Bookings />
                <ChangePassword /> */}
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        auth: state.auth
    }

}

export default connect(mapStateToProps)(Account)
