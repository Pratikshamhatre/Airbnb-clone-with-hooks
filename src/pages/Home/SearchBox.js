import React, {useState,useEffect} from 'react'
import './SearchBox.css'
import { withRouter } from 'react-router'
import useControlledInput from '../../customHooks/useControlledInput';


function SearchBox(props) {

    // const [where ,setWhere]=useState('');
    // const [checkIn ,setCheckIn]=useState('');
    // const [checkOut ,setCheckOut]=useState('');
    // const [guests ,setGuests]=useState(1);


    const where =useControlledInput('');
    const checkIn =useControlledInput('');
    const checkOut =useControlledInput('');
    const guests =useControlledInput('');

// constructor(props) {
//     super(props)

//     console.log(props)

//     this.state = {
//          where:'',
//          checkIn:'',
//          checkOut:'',
//          guests:0
//     }
// }



const submitSearch = (event) => {
    event.preventDefault();
    props.history.push(`/search/${where.value}`)
}




    // render() {
        return (
            <div className="home-search-box col m4">
                <h1 className="main-header-text">Book unique places to stay and things to do.</h1>
                
                <form onSubmit={submitSearch} className="search-box-form">
                    <div className="col m12">
                        <div className="form-label">Where</div>
                        <div className="input-field" id="where">
                            <input className="browser-default" name="where" {...where} placeholder="Anywhere" type="text" />
                        </div>
                    </div>

                    <div className="col m6">
                        <div className="form-label">Check-In</div>
                        <div className="input-field" id="check-in">
                            <input className="browser-default" name="checkIn" {...checkIn}  type="date" />
                        </div>
                    </div>
                    <div className="col m6">
                        <div className="form-label">Check-Out</div>
                        <div className="input-field" id="check-in">
                            <input className="browser-default" name="checkOut"  {...checkOut}  type="date" />
                        </div>
                    </div>
                    <div className="col m12">
                        <div className="form-label">Guests</div>
                        <div className="input-field" id="where">
                            <input className="browser-default" name="guests"  {...guests} placeholder="Number of guests"  type="number" />
                        </div>
                    </div>
                    <div className="col m12 submit-btn">
                        <div className="input-field" id="submit-btn">
                            <input className="btn-large waves-effect waves-light red accent-2" type="submit" />
                        </div>
                    </div>


                </form>
            </div>
        )
    // }
}


export default withRouter(SearchBox);
