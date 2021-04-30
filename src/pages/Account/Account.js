import axios from 'axios'
import React, {useState,useEffect} from 'react'
import "./Account.css"
import moment from 'moment';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AccountSideBar from './AccountSideBar';
import Bookings from './Bookings';
import ChangePassword from './ChangePassword';
import {connect, useSelector} from 'react-redux';
import auth from '../../reducers/authReducer';


function Account(props) {
const auth=useSelector(state =>state.auth)
    const [pastBookings, setPastBookings] = useState([]);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    console.log(auth)



    useEffect(() => {
      
            const accountUrl = `${window.apiHost}users/getBookings`;
            const token = auth.token;
            const data = {
                token: token
            }
          const fetchData=(async() => {

                let resp = await axios.post(accountUrl, data);
                console.log(resp)
                resp.data.forEach((booking) => {
                    console.log(booking);
                    const today = moment();
                    const checkOutDate = moment(booking.checkOut);
                    const diffDays = checkOutDate.diff(today, 'days');
                    console.log(diffDays);
                    if (diffDays < 0) {
                        pastBookings.push(booking)
                    }
                    else {
                        upcomingBookings.push(booking)
                    }
    
                    setPastBookings(pastBookings);
                    setUpcomingBookings(upcomingBookings);
            
            })


        });

        fetchData();



     } , []);


            return (
                <div className="account container-fluid">
                    <AccountSideBar />

                    <div className="row">
                        <div className="col s8 offset-s3">
                            <Route exact path="/account" render={() =>
                                <h1>Choose an option on the left!</h1>

                            } />
                            <Route exact path="/account/reservations/confirmed" render={() =>
                                <Bookings type="upcoming" bookings={upcomingBookings} token={auth.token} />
                            } />
                            <Route exact path="/account/reservations/past" render={() =>
                                <Bookings type="past" bookings={pastBookings} />
                            } />
                            <Route exact path="/account/change-pass" component={ChangePassword} token={auth.token} />

                        </div>

                    </div>
          
                </div>
            )
            }
    


function mapStateToProps(state) {
            return {
                auth: state.auth
            }

        }

// export default connect(mapStateToProps)(Account)
export default Account
