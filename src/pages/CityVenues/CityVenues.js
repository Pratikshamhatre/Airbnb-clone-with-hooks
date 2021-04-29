import axios from 'axios';
import React, {Component} from 'react'
import Spinner from '../../utility/Spinner/Spinner';
import Venues from '../../utility/Venue/Venues';
import "./CityVenues.css"
export default class CityVenues extends Component {
    constructor(props) {
        super(props)

        this.state = {
            venues: [],
            header: ''
        }
    }


    async componentDidMount() {
        const cityName = this.props.match.params.cityName;
        const url = `${window.apiHost}venues/city/${cityName}`;
        const resp = await axios.get(url);
        console.log(resp);
        this.setState({
            venues: resp.data.venues,
            header: resp.data.header
        })


    }
    render() {

        const style={
            margin:'20px'
        }

        if (!this.state.header) {
            return <Spinner />
        }

        else {

            return (
                <div style={style}>

                    <h1>{this.props.match.params.cityName}</h1>

                    <div className="row">
                        <div className="col s12">
                            <Venues venues={this.state.venues} header={this.state.header} />

                        </div>

                    </div>

                </div>
            )
        }
    }
}
