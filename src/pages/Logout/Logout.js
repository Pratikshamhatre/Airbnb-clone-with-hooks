import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import logoutAction from '../../actions/logoutAction'
import openModal from '../../actions/openModal'
import "./Logout.css"
class Logout extends Component {


    logout=()=>{
        this.props.logout();
        this.props.openModal('closed','');
        this.props.history.push(``)

    }
    render() {
    console.log(this.props)

        const style = {
            marginTop: '20px'
        }
        return (
            <div style={style}>
                <h5 className="logout-heading">Are you sure you want to Logout?</h5>
                <button type="button" className="btn accent-2" onClick={this.logout}>Yes</button>
            </div>
        )
    }
}





function mapDispatchToProps(dispatcher) {
    return bindActionCreators({
        logout: logoutAction,
        openModal:openModal
    }, dispatcher)

}

export default connect(null, mapDispatchToProps)(Logout);
