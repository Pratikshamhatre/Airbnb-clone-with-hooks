import React from 'react'
import moment from 'moment';
import swal from 'sweetalert';
import axios from 'axios';

export default function Bookings(props) {


    const cancelBooking= async (bid,location)=>{
        console.log(bid,location)

        const cancelReservation=await swal({
            buttons:true,
            text:`Are ou sure you want to cancel your trip to ${location}?`,
            icon:'warning',
        })

        if(cancelReservation){
            const url=`${window.apiHost}reservation/cancel`;
            const data={
                bid:bid,
                token:props.token
            }

            let resp=await axios.post(url,data);
            console.log(resp)
            if(resp.data.msg==='cancelled'){
                swal({
                    text:"Reservation is cancelled!",
                    icon:'success',

                })
            }
        }
    }

    const bookings=props.bookings.map((booking,i)=>{
        const dates=`${moment(booking.checkIn).format('MMM Do ,YYYY')}-${moment(booking.checkOut).format('MMM Do ,YYYY')}`
     return (  
        <tr key={i} className="booking-row">
    <td>{booking.status==='confirmed' && props.type==='past'  ? 'Complete' : booking.status}</td>
    <td>
        <div className="booking-detail">{dates}</div>
        <div className="booking-detail">{booking.venueData.title}</div>
        <div className="booking-detail">{booking.venueData.location}</div>
    </td>
    <td>
        <div className="booking-detail">Confirmation #: {booking.conf}</div>
        <div className="booking-detail">{booking.numberOfGuests} Guests, {booking.totalNights} Nights</div>
        <div className="booking-detail">${booking.pricePerNight} per night</div>
        <div className="booking-detail">${booking.totalPrice} Total</div>
    </td>
    <td>
        <div className="booking-detail pointer">
            Print Reservation
        </div>

        {props.type==='upcoming' && booking.status!=='cancelled' ? <div className="booking-detail pointer" onClick={()=>cancelBooking(booking.id,booking.venueData.location)}>Cancel Confirmation</div> : ''}
        
    </td>
</tr>

    )
    })

console.log(props)
    return (
        <div>
           <table className="booking">
    <thead>
        <tr>
            <th>Status</th>
            <th>Dates and location</th>
            <th>Details</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {bookings}
    </tbody>
</table>
        </div>
    )
}
