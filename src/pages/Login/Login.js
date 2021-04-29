import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import "./Login.css"
import openModal from '../../actions/openModal';
import SignUp from './SignUp';
import axios from 'axios';
import swal from 'sweetalert';
import regAction from '../../actions/regAction';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }



    handleInputChange = (event) => {
        console.log(event)
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }


    onSubmit = async (event) => {
        event.preventDefault()
        console.log(this.state)
        const url = `${window.apiHost}/users/login`;
        let resp = await axios.post(url, this.state)
        console.log(resp)

        this.props.regAction(resp.data)

         if (resp.data.msg === "loggedIn") {
            swal({
                title: "Login Successful!",
                icon: "success",
            });

          
                this.props.openModal('closed', "");

        }

        else if (resp.data.msg === "noEmail") {
            swal({
                title: "No email found",
                icon: "error",
            });
        
        }

        
       else if (resp.data.msg === "badPass") {
            swal({
                title: "Incorrect password",
                icon: "error",
            });


        
        }

    }


    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.onSubmit}>
                    <button className="facebook-login">Connect With Facebook</button>
                    <button className="google-login">Connect With Google</button>
                    <div className="login-or center">
                        <span>or</span>
                        <div className="or-divider"></div>
                    </div>
                    <input type="text" name="email" onChange={this.handleInputChange} className="browser-default" placeholder="Email address" />
                    <input type="password" name="password" onChange={this.handleInputChange} className="browser-default" placeholder="Password" />
                    <button className="sign-up-button" type="submit" >Login</button>
                    <div className="divider"></div>
                    <div>Don't have an account? <span className="pointer" onClick={() => {this.props.openModal('open', <SignUp />)}}>Sign up</span></div>
                </form>
            </div>
        )
    }
}




function mapDispatchToProps(dispatcher) {
    console.log(dispatcher)
    return bindActionCreators({
        openModal: openModal,
        regAction: regAction
    }, dispatcher)
}


export default connect(null, mapDispatchToProps)(Login)