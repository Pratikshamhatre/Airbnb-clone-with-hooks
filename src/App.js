import React, { Component,lazy ,Suspense} from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import history from './History/History';
import Spinner from './utility/Spinner/Spinner';
// import Account from './pages/Account/Account';
// import CityVenues from './pages/CityVenues/CityVenues';
// import Home from './pages/Home/Home'
// import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';
// import Search from './pages/Search/Search';
// import SingleFullVenue from './pages/SingleFullVenue/SingleFullVenue'
// import Modal from './utility/Modal/Modal'
// import Navbar from './utility/Navbar/Navbar'

const Account =lazy(()=>import('./pages/Account/Account'));
const Search =lazy(()=>import('./pages/Search/Search'));
const SingleFullVenue =lazy(()=>import('./pages/SingleFullVenue/SingleFullVenue'));
const Modal =lazy(()=>import('./utility/Modal/Modal'));
const PaymentSuccess =lazy(()=>import('./pages/PaymentSuccess/PaymentSuccess'));
const Navbar =lazy(()=>import('./utility/Navbar/Navbar'));
const CityVenues =lazy(()=>import('./pages/CityVenues/CityVenues'));
const Home =lazy(()=>import('./pages/Home/Home'));




// import "app.css"
export default class App extends Component {
  render() {
    return (
    <Router history={history}>
      <Suspense fallback={<Spinner />}>
      <Route  path="/" component={Navbar}/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/venue/:vid" component={SingleFullVenue}/>
      <Route exact path="/city/:cityName" component={CityVenues}/>
      <Route exact path="/payment-success/:stripeToken" component={PaymentSuccess}/>

      <Route path="/search/:searchTerm" component={Search} />

      <Route  path="/account" component={Account}/>

      <Route path="/" component={Modal} />

      </Suspense>
    </Router>
    )
  }
}
