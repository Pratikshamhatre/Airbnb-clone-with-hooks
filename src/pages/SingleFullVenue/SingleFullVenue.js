import React, {Component} from 'react';
import "./SingleFullVenue.css";
import axios from 'axios'
import Point from './Point';
import {connect} from 'react-redux';
import {auth} from '../../reducers/authReducer'
import {bindActionCreators} from 'redux';
import openModal from '../../actions/openModal';
import Login from '../Login/Login';
import moment from 'moment';
import swal from 'sweetalert';
import loadScript from '../../UtilityFunction/loadScript';



class SingleFullVenue extends Component {

    constructor(props) {
        super(props)

        this.state = {
            singleVenue: {}, points: [],
            checkIn: '',
            checkOut: ''
        }
    }



    async componentDidMount() {
        const vid = this.props.match.params.vid;
        const url = `${window.apiHost}venue/${vid}`;
        let response = await axios.get(url);
        const singleVenue = response.data;
        const pointsUrl = `${window.apiHost}points/get`;
        const pointsResponse = await axios.get(pointsUrl);
        const points = singleVenue.points.split(',').map((point, i) => {
            return <Point pointDesc={pointsResponse.data} point={point} key={i} />
        })

        this.setState({singleVenue, points})
    }


    reserveNow = async() => {
        console.log("User wants to reserve!")
        console.log(this.state);
        const startDayMoment = moment(this.state.checkIn);
        const endDayMoment = moment(this.state.checkOut);
        const diffDays = endDayMoment.diff(startDayMoment,'days');
        console.log(diffDays);
        if(diffDays < 1){
            swal({
                text:'Check out date must me after check in date',
                icon:'error'
            })
        }

        else if( isNaN(diffDays)){
            swal({
                text:'Please make sure your dates are valid',
                icon:'error'
            })
        }
else{
    const pricePerNight=this.state.singleVenue.pricePerNight;
    const totalPrice=pricePerNight * diffDays;
    const scriptUrl = 'https://js.stripe.com/v3';
    const stripePublicKey = 'pk_test_5198HtPL5CfCPYJ3X8TTrO06ChWxotTw6Sm2el4WkYdrfN5Rh7vEuVguXyPrTezvm3ntblRX8TpjAHeMQfHkEpTA600waD2fMrT';
    await loadScript(scriptUrl) 
    const stripe = window.Stripe(stripePublicKey);
    const stripeSessionUrl=`${window.apiHost}payment/create-session`;
    const data={
        venueData:this.state.singleVenue, totalPrice, diffDays, pricePerNight, checkIn:this.state.checkIn, checkOut:this.state.checkOut, token:this.props.auth.token, currency:"USD",
    }

    let sessionResponse=await axios.post(stripeSessionUrl,data);
    stripe.redirectToCheckout({
        sessionId:sessionResponse.data.id
    }).then((result)=>{
        console.log(result)
    })
    console.log(sessionResponse)

}

     

    }

    handleChange = (event) => {
        const {name, value} = event.target;
        console.log(event)
        this.setState({
            [name]: value
        })
    }
    render() {

        const {imageUrl, title, location, guests, details, amenities, pricePerNight, rating} = this.state.singleVenue;
        console.log(imageUrl)
        return (
            <div className="row single-venue">
                <div className="col s12 center">
                    <img src={imageUrl} alt={title} />
                </div>
                <div className="col s8 location-details  offset-s2">


                    <div className="col s8">

                        <div className="location">{location}</div>
                        <div className="title">{title}</div>
                        <div className="guests">{guests}</div>

                        <div className="divider"></div>
                        {this.state.points}

                        <div className="details"> {details}</div>
                        <div className="amenities"> {amenities}</div>
                    </div>

                    <div className="col s4 right-details">
                        <div >

                            <span className="price-per-night"> ${pricePerNight}</span> <span>per day</span>
                        </div>

                        <div className="rating">

                            {rating} </div>

                        <div className="col s6">
                            Check-In
<input type="date" name="checkIn" onChange={this.handleChange} />
                        </div>

                        <div className="col s6">
                            Check-Out
<input type="date" name="checkOut" onChange={this.handleChange} />


                        </div>
                        <div className="col s12">
                            <select className="browser-default">
                                <option value="1">1 Guest</option>
                                <option value="2">2 Guests</option>
                                <option value="3">3 Guests</option>
                                <option value="4">4 Guests</option>
                                <option value="5">5 Guests</option>
                                <option value="6">6 Guests</option>
                                <option value="7">7 Guests</option>
                                <option value="8">8 Guests</option>

                            </select>



                        </div>

                        {
                            this.props.auth.token ?
                                <div className="col s12 center">
                                    <button className="btn red accent-2" onClick={this.reserveNow}>Reserve</button>
                                </div> : <div className="center">You must <span className="pointer text-link" onClick={() => this.props.openModal('open', <Login />)}> <a> Log in</a></span> to reserve</div>
                        }

                    </div>


                </div>


            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log(state)
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatcher) {
    return bindActionCreators({
        openModal: openModal
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleFullVenue)