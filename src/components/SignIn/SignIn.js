import React from 'react'
import auth from '../../services/auth'
import token from '../../services/token';
import AppContext from '../../contexts/AppContext.js'
import MsgBox from '../MsgBox/MsgBox'


class SignIn extends React.Component{
  static contextType = AppContext;
    constructor(props) {
        super(props)
        this.state = {
            error: '',
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
            token.saveUser(JSON.stringify(res.user))
            this.props.history.push('/dashboard')
          })
          .catch((res) => {
            this.setState({ error: res.error });
          });
      };

    render() {
        return(
          <>
          <MsgBox msg="admin: admin\n password: passwOrd1@"/>
            <form onSubmit={this.handleSubmitJwtAuth}>
                <small>{this.state.error}</small>
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
            </>
        );
    }
}

export default SignIn;