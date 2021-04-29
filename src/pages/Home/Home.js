import axios from 'axios'
import React, {Component} from 'react'
import Activities from '../../utility/Activity/Activities'
import Cities from '../../utility/City/Cities'
import Spinner from '../../utility/Spinner/Spinner'
import Venues from '../../utility/Venue/Venues'
import './Home.css'
import SearchBox from './SearchBox'


export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cities: [],
            asiaCities: {},
            europeCities: {},
            exoticCities: {}, activities: [],
            venues: {}
        }
    }


    async componentDidMount() {

        const citiesUrl = `${window.apiHost}cities/recommended`;
        const europeCitiesUrl = `${window.apiHost}cities/europe`;
        const asiaCitiesUrl = `${window.apiHost}cities/asia`;
        const exoticCitiesUrl = `${window.apiHost}cities/exotic`;
        const venuesUrl = `${window.apiHost}venues/recommended `;



        const citiesPromise = [];

        citiesPromise.push(await axios.get(citiesUrl));
        citiesPromise.push(await axios.get(europeCitiesUrl));
        citiesPromise.push(await axios.get(asiaCitiesUrl));
        citiesPromise.push(await axios.get(exoticCitiesUrl));
        citiesPromise.push(await axios.get(venuesUrl));

        const activitiesUrl = `${window.apiHost}activities/today`;
        const activities = await axios.get(activitiesUrl)
        Promise.all(citiesPromise).then((data) => {
            console.log(data)
            const recommendedCities = data[0].data;
            const europeCities = data[1].data;
            const asiaCities = data[2].data;
            const exoticCities = data[3].data;
            const venues = data[4].data;

            this.setState({
                cities: recommendedCities,
                asiaCities,
                europeCities,
                exoticCities,
                venues
                // activities: activities.data
            })

        })


        this.setState(await {
            activities: activities.data
        })

    }
    render() {
        const activity = '';
        if (this.state.cities.length === 0) {
            return (<Spinner />)
        }

        const margin = {
            marginBottom: 'unset'
        }


        return (
            <>
                <div className="container-fluid">
                    <div className="row " style={margin} >
                        <div className="home col s12">
                            <div className="upper-fold">
                                <SearchBox />
                            </div>

                        </div>


                    </div>


                </div>
                <div className="container-fluid lower-fold">
                    <div className="row  ">

                        <div className="col s12">

                            <Cities cities={this.state.cities} header="Recommended Cities For You" />
                        </div>

                        <div className="col s12">

                            <Activities activities={this.state.activities} header="Today in your area" />
                        </div>
                        <div className="col s12">

                            <Cities cities={this.state.europeCities.cities} header={this.state.europeCities.header} />
                        </div>
                        <div className="col s12">

                            <Cities cities={this.state.asiaCities.cities} header={this.state.asiaCities.header} />
                        </div>
                        <div className="col s12">

                            <Cities cities={this.state.exoticCities.cities} header={this.state.exoticCities.header} />
                        </div>

                        <div className="col s12">
                            <Venues venues={this.state.venues.venues} header={this.state.venues.header} />
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
