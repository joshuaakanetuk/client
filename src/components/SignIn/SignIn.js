import React from 'react'

class SignIn extends React.Component{
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return(
            <form>
                <label htmlFor="signin">Sign In:</label>
                <input type="radio" name="signin" id="signin" defaultValue="signin"/><br/>
                <label htmlFor="signin">Sign Up:</label>
                <input type="radio" name="signup" id="signup" defaultValue="signup"/><br/>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" /><br/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password"  /><br/>
                <span>IF SIGN UP</span><br/>
                <label htmlFor="brandname">Brand Name:</label>
                <input type="brandname" name="brandname" id="brandname"  /><br/>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" /><br></br>
            </form>
        );
    }
}

export default SignIn;