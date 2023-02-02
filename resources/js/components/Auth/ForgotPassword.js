import React, { Component } from 'react';

var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uname: '',
            errormessage: '',
            psw: '',
        };
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let err = '';
        if (nam === "uname") {
            if ((val.length > 1 && this.state.errormessage !== "") || (val !== "" && Number(val))) {
                err = <strong style={{ color: 'red' }}>Your Name should not start with a number</strong>;
            }
        }
        if (nam === "uname") {
            if (format.test(val)) {
                err = <strong style={{ color: 'red' }}>Your Name should not contains special characters</strong>;
            }
        }
        this.setState({ errormessage: err });
        this.setState({ [nam]: val });
    }

    validateMyForm = (event) => {
        let err = '';
        if (this.state.errormessage !== '') {
            err = <strong style={{ color: 'red' }}>Validations failed</strong>;
            this.setState({ errormessage: err });
            event.preventDefault();
            return false;
        }
        return true;
    }
    render() {
        return (
            <div className='myapp1'>
                <div className="container1" >
                    <form className="lrform1" onSubmit={this.validateMyForm}>
                        <div className="container1">
                        <h1>Password Reset</h1>
                            <label htmlFor="uname"><b>Email</b></label>
                            <input className="input1" type="email" placeholder="Enter Email" name="uname" required onChange={this.myChangeHandler} />

                            {this.state.errormessage}
                            <button className="register_btn1" type="submit">Login</button>
                        </div>

                    </form>
                </div>
            </div>

        );
    }
}

export default ForgotPassword;