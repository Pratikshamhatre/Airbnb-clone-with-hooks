import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import './Navbar.css';
import openModal from '../../actions/openModal';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/Login/SignUp';
import logoutAction from '../../actions/logoutAction';
import Logout from '../../pages/Logout/Logout';


class Navbar extends Component {



    componentDidMount(){
        console.log(JSON.parse(localStorage.getItem('currentUser')));
        console.log(this.props);
        
    }
  
    render() {
        let navColor = "transparent";
        if (this.props.location.pathname !== "/") {
            navColor = "black"
        }

        console.log((window.scrollY > 900))
        // else if(window.scrollY > 900){
        //     navColor = "nav-color"

        // }

       


    let accountLinkStyle={
        display:'inline-block'
    }

        console.log(this.props)
        return (
            <div className="container-fluid nav">
                <div className="row">

                    <nav className={navColor}>
                        <div className="nav-wrapper">
                            <Link to="/" className="left">  <i className="material-icons">bubble_chart</i>
                            </Link>
                            <ul id="nav-mobile" className="right">

                                <li> <Link to="/">  Englis (US) </Link></li>
                                <li> <Link to="/">  $ USD </Link></li>
                                <li> <Link to="/"> Become a host </Link></li>
                                <li> <Link to="/"> Help </Link></li>

                                
                                  {  this.props.auth.token  ?

<>
<li>Hiii,<Link style={accountLinkStyle} to="/account"> {this.props.auth.email}</Link></li>
                                  
                                  <li onClick={() => this.props.openModal('open', <Logout />)}><a>Log out</a></li>
                                  </>
                                    
                                    :

                                    <>
                                        <li onClick={() => this.props.openModal('open', <SignUp />)}><a> Sign Up</a></li>
                                        <li onClick={() => this.props.openModal('open', <Login />)}> <a> Log in</a></li>
                                        </>
                                    }
                                
                              

                            </ul>

                        </div>
                    </nav>

                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        auth:state.auth 
    }
}


function mapDispatchToProps(dispatcher) {
    return bindActionCreators({
        openModal: openModal,
        logout:logoutAction
    }, dispatcher)
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);




