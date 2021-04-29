import React, {Component} from 'react'
import './SearchBox.css'
import { withRouter } from 'react-router'


class SearchBox extends Component {
constructor(props) {
    super(props)

    console.log(props)

    this.state = {
         where:'',
         checkIn:'',
         checkOut:'',
         guests:0
    }
}



submitSearch = (event) => {
    event.preventDefault();
    console.log(this.props);
    this.props.history.push(`/search/${this.state.where}`)
}

handleChange =(e)=>{
    const {name,value}=e.target;
    console.log(e)
    this.setState({[name]:value})
}



    render() {
        return (
            <div className="home-search-box col m4">
                <h1 className="main-header-text">Book unique places to stay and things to do.</h1>
                
                <form onSubmit={this.submitSearch} className="search-box-form">
                    <div className="col m12">
                        <div className="form-label">Where</div>
                        <div className="input-field" id="where">
                            <input className="browser-default" name="where" onChange={this.handleChange} placeholder="Anywhere" value={this.state.where} type="text" />
                        </div>
                    </div>

                    <div className="col m6">
                        <div className="form-label">Check-In</div>
                        <div className="input-field" id="check-in">
                            <input className="browser-default" name="checkIn" onChange={this.handleChange} value={this.state.checkIn} type="date" />
                        </div>
                    </div>
                    <div className="col m6">
                        <div className="form-label">Check-Out</div>
                        <div className="input-field" id="check-in">
                            <input className="browser-default" name="checkOut" onChange={this.handleChange} value={this.state.checkOut} type="date" />
                        </div>
                    </div>
                    <div className="col m12">
                        <div className="form-label">Guests</div>
                        <div className="input-field" id="where">
                            <input className="browser-default" name="guests" onChange={this.handleChange} placeholder="Number of guests" value={this.state.guests} type="number" />
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
    }
}


export default withRouter(SearchBox);
