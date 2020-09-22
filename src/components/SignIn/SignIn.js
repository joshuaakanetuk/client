import React from "react";
import auth from "../../services/auth";
import token from "../../services/token";
import AppContext from "../../contexts/AppContext.js";
import MsgBox from "../MsgBox/MsgBox";
import { CopyToClipboard } from "react-copy-to-clipboard";

class SignIn extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      status: 0,
      user_name: "",
      password: "",
      email: "",
      type: "",
      full_name: "",
      loginStatus: "signin",
    };
  }

  handleCheck = (e) => {
    this.setState({
      loginStatus: e.currentTarget.id,
    });
  };

  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;

    auth
      .postLogin({
        user_name: user_name.value,
        password: password.value,
      })
      .then((res) => {
        user_name.value = "";
        password.value = "";
        token.saveAuthToken(res.authToken);
        token.saveUser(JSON.stringify(res.user));
        this.props.history.push("/dashboard");
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const copy = (
      <>
        <div className="copyBox">
          <span className="loginCopy">User: admin</span>
          <CopyToClipboard text={"passwOrd1@"}>
            <button>Click here for password for admin.</button>
          </CopyToClipboard>
        </div>
        <div className="copyBox">
          <span className="loginCopy">User: client</span>
          <CopyToClipboard text={"passwOrd1@"}>
            <button>Click here for password for client.</button>
          </CopyToClipboard>
        </div>
      </>
    );

    return (
      <div className="dashboard">
        <MsgBox msg={copy} />
        <form id="login" onSubmit={this.handleSubmitJwtAuth}>
          <small>{this.state.error}</small><br></br>
          {this.state.loginStatus === "signin" ? (
            <>
              <label htmlFor="user_name">Username:</label>
              <input type="text" name="user_name" id="user_name" />
              <br />
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" />
              <br />
            </>
          ) : (
            <>
              <label htmlFor="user_name">Username:</label>
              <input type="text" name="user_name" id="user_name" />
              <br />
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" />
              <br />
              <label htmlFor="full_name">Name of Brand:</label>
              <input type="text" name="full_name" id="full_name" />
              <br />
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" />
              <br></br>
            </>
          )}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
              margin: "20px 0",
            }}
          >
            <div>
              <label htmlFor="signin">Sign In:</label>
              <input
                type="radio"
                onChange={this.handleCheck}
                defaultChecked={this.state.loginStatus === "signin"}
                name="signup"
                id="signin"
              />
            </div>
            <div>
              <label htmlFor="signin">Sign Up:</label>
              <input
                type="radio"
                onChange={this.handleCheck}
                name="signup"
                id="signup"
              />
            </div>
          </div>
          <input className="button" type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}

export default SignIn;
