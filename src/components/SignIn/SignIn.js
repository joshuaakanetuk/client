import React from 'react'
import auth from '../../services/auth'
import token from '../../services/token';


class SignIn extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            status: 0,
            user_name: "",
            password: "",
            email: "",
            type: '',
            full_name: ''
        }
    }

    handleSubmitJwtAuth = (ev) => {
        ev.preventDefault();
        this.setState({ error: null });
        const { user_name, password } = ev.target;
    
        auth.postLogin({
          user_name: user_name.value,
          password: password.value,
        })
          .then((res) => {
            user_name.value = "";
            password.value = "";
            token.saveAuthToken(res.authToken);
            this.props.onLoginSuccess();
          })
          .catch((res) => {
            this.setState({ error: res.error });
          });
      };

    render() {
        return(
            <form onSubmit={this.handleSubmitJwtAuth}>
                <label htmlFor="signin">Sign In:</label>
                <input type="radio" name="signup" id="signin"/><br/>
                <label htmlFor="signin">Sign Up:</label>
                <input type="radio" name="signup" id="signup"/><br/>


                <label htmlFor="user_name">Username:</label>
                <input type="text" name="user_name" id="user_name" /><br/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password"  /><br/>
                <span>IF SIGN UP</span><br/>
                <label htmlFor="full_name">Name of Brand:</label>
                <input type="full_name" name="full_name" id="full_name"  /><br/>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" /><br></br>
                <input type="submit" value="Submit"></input>
            </form>
        );
    }
}

export default SignIn;