import axios from 'axios';
import React, {useState,useEffect} from 'react'
import Activities from '../../utility/Activity/Activities';
import Cities from '../../utility/City/Cities';
import Spinner from '../../utility/Spinner/Spinner';
import Venues from '../../utility/Venue/Venues';
import '../Home/Home.css';
export default function  Search(props) {


    const [activities,setActivities]=useState([]);
    const [cities,setCities]=useState([]);
    const [venues,setVenues]=useState([]);
    const [waiting,setWaiting]=useState([false]);



    useEffect(()=>{

       const fetchSearchData=async ()=>{
            const searchTerm = props.match.params.searchTerm;
                const url = `${window.apiHost}search/${searchTerm}`;
                console.log(url);
                const resp = await axios.get(url);
                console.log(resp)
                setActivities(resp.data.activities);
                setCities(resp.data.cities);
                setVenues(resp.data.venues);
                setWaiting(true);
                // this.setState({
                //     activities: resp.data.activities,
                //     cities: resp.data.cities,
                //     venues: resp.data.venues,
                //     waiting: false
        
                // })
        
        }


        fetchSearchData();

    },[])



    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         activities: [],
    //         cities: [],
    //         venues: [],
    //         waiting: true
    //     }
    // }

    // async componentDidMount() {
    //     const searchTerm = this.props.match.params.searchTerm;
    //     const url = `${window.apiHost}search/${searchTerm}`;
    //     console.log(url);
    //     const resp = await axios.get(url);
    //     console.log(resp)
    //     this.setState({
    //         activities: resp.data.activities,
    //         cities: resp.data.cities,
    //         venues: resp.data.venues,
    //         waiting: false

    //     })

    //     console.log(this.state)
    // }
    // render() {

        const style = {
            marginTop: "50px"
        }

        if (!waiting) {
            return <Spinner />
        }


        return (
            <div className="container-fluid lower-fold" style={style}>
            <div className="row">
                <div className="col s12">
                    <Cities cities={cities} header="Cities Matching Your Search" />
                </div>            
                <div className="col s12">
                    <Activities activities={activities} header="Activies Matching Your Search" />
                </div>            
                <div className="col s12">
                    <Venues venues={venues} header="Venues matching your search" />
                </div>            

            </div>
        </div>
        )
    // }
}
