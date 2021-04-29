import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import openModal from '../../actions/openModal'
import Login from './Login'
import swal from 'sweetalert';
import regAction from '../../actions/regAction'



class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            lowerPartOfForm: <button type="button" onClick={this.showInputs} className="sign-up-button">Sign up with email</button>,
            emailError:false,
            passwordError:false
        }
    }

    changeEmail = (e) => this.setState({email: e.target.value})
    changePassword = (e) => this.setState({password: e.target.value})

    showInputs = () => {
        this.setState({
            lowerPartOfForm: <SignUpInputFields
                changeEmail={this.changeEmail}
                changePassword={this.changePassword}
            />
        })
    }

    submitLogin = async (e) => {
        e.preventDefault();
        // console.log(this.state.email);
        // console.log(this.state.password);


        const url = `${window.apiHost}/users/signup`;
        const data = {
            email: this.state.email,
            password: this.state.password
        }


        // console.log(this.validate(data))
        // if (this.validate()) {
            const resp = await axios.post(url, data);
            if (resp) {
                this.props.openModal('closed', "");

            }
            const token = resp.data.token;


            if (resp.data.msg === "userExists") {
                swal({
                    title: "Email Exists",
                    text: "The email you provided is already registered. Please try another.",
                    icon: "error",
                })
            } else if (resp.data.msg === "invalidData") {
                swal({
                    title: "Invalid email/password",
                    text: "Please provide a valid email and password",
                    icon: "error",
                })
            } else if (resp.data.msg === "userAdded") {
                swal({
                    title: "Success!",
                    icon: "success",
                });
                this.props.regAction(resp.data);
            }

        // }

        // else{

        //     let msg='';
        //     let title='';
        //     console.log(this.state)

        //     if(this.state.email==="" || this.state.password===""){
        //          msg=`Please provide ${this.state.email==="" ? 'Email' : 'Password'}`;
        //          title=`Invalid ${this.state.email==="" ? 'Email' : 'Password'}`;

        //     }
        //     else if(this.state.email && !this.state.password){
        //         msg="Please provide valid email && Please provide Password"
        //         title="Invalid Email & Password";
        //     }

        //     else if(this.state.password && !this.state.email){
        //         msg="Please provide valid password & Please provide Email"
        //         title="Invalid Email & Password";
        //     }



        //     else if((!this.state.emailError && !this.state.passswordError)){
        //         msg="Please provide valid email & password"
        //         title="Invalid Email & Password"; 
        //     }
        //     console.log('sfjhsdg',msg,title)
        //     swal({
        //         title: title,
        //         text:msg,
        //         icon: "error",
        //     });
        // }





    }

    render() {

        console.log('------------------------------------',this.props.auth);

        return (
            <div className="login-form">
                <form onSubmit={this.submitLogin}>
                    <button className="facebook-login">Connect With Facebook</button>
                    <button className="google-login">Connect With Google</button>
                    <div className="login-or center">
                        <span>or</span>
                        <div className="or-divider"></div>
                    </div>
                    {this.state.lowerPartOfForm}
                    <div className="divider"></div>
                    <div>Already have an account? <span className="pointer" onClick={() => {this.props.openModal('open', <Login />)}}>Log in</span></div>
                </form>
            </div>

        )
    }



//     validate= () => {

//         console.log(this.state);
//         const {email,password}=this.state
//         const emailPattern = new RegExp(/[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g);
//         const passwordPattern = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/g
//         );
// console.log(emailPattern.test(email))
// console.log(passwordPattern.test(password))

// let pass=passwordPattern.test(password);
//         this.setState({
//             emailError:emailPattern.test(email),
//             passwordError:pass,

//         })


//         console.log(this.state)
   
//         return this.state.emailError
//  || this.state.passswordError
// ;





//     }



    
}

function mapStateToProps(state) {
console.log(state)
    return {
        auth: state.auth,
        siteModal: state.siteModal
    }


}

function mapDispatchToProps(dispatcher) {
    return bindActionCreators({
        openModal: openModal,
        regAction: regAction,
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);


const SignUpInputFields = (props) => {
    return (
        <div className="sign-up-wrapper">
            <div className="col m12">
                <div className="input-field" id="email">
                    <div className="form-label">Email</div>
                    <input type="text" placeholder="Email" onChange={props.changeEmail} />
                </div>
            </div>
            <div className="col m12">
                <div className="input-field" id="password">
                    <div className="form-label">Password</div>
                    <input type="password" placeholder="Password" onChange={props.changePassword} />
                </div>
            </div>
            <div className="col m12">
                <button type="submit" className="btn red accent-2">Sign Up!</button>
            </div>
        </div>
    )
}