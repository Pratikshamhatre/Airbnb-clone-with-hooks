import axios from 'axios';
import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import swal from 'sweetalert';


export default function ChangePassword() {

    const token = useSelector(state => state.auth.token);
    console.log(token)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleInputChange = (event) => {

        console.log(event)
    }


    const  handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword === confirmPassword && newPassword && confirmPassword) {
            const url = `${window.apiHost}users/change-password`;
            const data = {
                token, newPassword
            }


            const resp =await axios.post(url, data);
            console.log(resp)
            if (resp.data.msg === "passUpdated") {
                swal({
                    text: "Password updated successfully!",
                    icon: "success"
                })
            }
            else{
                swal({
                    text: "There is some error!",
                    icon: "error"
                })
            }
        }
        else if(!newPassword && !confirmPassword ){
            swal({
                text: "Please enter new password!",
                icon: "error"
            })
        }

        else{
            swal({
                text: "Password must match!",
                icon: "error"
            })
        }
        console.log(newPassword, confirmPassword)

    }

    return (
        <div className="col s6 offset-s3">
            <form onSubmit={handleSubmit}>
                <h3 className="center">Change Password</h3>
                <div className="form-label">New Password</div>
                <input type="password" name="password" onChange={(e) => setNewPassword(e.target.value)} className="browser-default" placeholder="Password" />
                <div className="form-label">Confirm Password</div>
                <input type="password" name="password" onChange={(e) => setConfirmPassword(e.target.value)} className="browser-default" placeholder="Password" />

                <button className="btn red change-pass-submit" type="submit">Submit</button>

            </form>
        </div>
    )
}
