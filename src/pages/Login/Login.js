import React, {useState} from 'react'
import {bindActionCreators} from 'redux'
import "./Login.css"
import openModal from '../../actions/openModal';
import SignUp from './SignUp';
import axios from 'axios';
import swal from 'sweetalert';
import regAction from '../../actions/regAction';
import useControlledInput from '../../customHooks/useControlledInput';
import {useDispatch} from 'react-redux';
function Login(props) {

    const dispatch=useDispatch();

    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         email: '',
    //         password: ''
    //     }
    // }

    const email=useControlledInput('');
    const password=useControlledInput('');





    // handleInputChange = (event) => {
    //     console.log(event)
    //     const {name, value} = event.target
    //     this.setState({
    //         [name]: value
    //     })
    // }


  const  onSubmit = async (event) => {
        event.preventDefault()
        const url = `${window.apiHost}/users/login`;
        const data={
            email:email.value,
            password:password.value
        }
        let resp = await axios.post(url,data )
        console.log(resp)

        dispatch(regAction(resp.data))

         if (resp.data.msg === "loggedIn") {
            swal({
                title: "Login Successful!",
                icon: "success",
            });

          
                props.openModal('closed', "");

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


    // render() {
        return (
            <div className="login-form">
                <form onSubmit={onSubmit}>
                    <button className="facebook-login">Connect With Facebook</button>
                    <button className="google-login">Connect With Google</button>
                    <div className="login-or center">
                        <span>or</span>
                        <div className="or-divider"></div>
                    </div>
                    <input type="text" name="email" {...email} className="browser-default" placeholder="Email address" />
                    <input type="password" name="password" {...password}  className="browser-default" placeholder="Password" />
                    <button className="sign-up-button" type="submit" >Login</button>
                    <div className="divider"></div>
                    <div>Don't have an account? <span className="pointer" onClick={() => dispatch(openModal('open', <SignUp />))}>Sign up</span></div>
                </form>
            </div>
        )
    }
// }




function mapDispatchToProps(dispatcher) {
    console.log(dispatcher)
    return bindActionCreators({
        openModal: openModal,
        regAction: regAction
    }, dispatcher)
}


export default Login
