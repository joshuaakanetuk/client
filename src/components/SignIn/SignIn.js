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
      statusMsg: "",
      error: "",
      status: 0,
      user_name: "",
      password: "",
      email: "",
      type: "",
      full_name: "",
      loginStatus: this.props.match.path,
    };
  }

  // clear error messages on load
  componentDidMount = () => {
    this.context.clearError();
  };

  // clear status messages
  clearMessages = () => {
    this.setState({
      statusMsg: "",
    });
  };

  // handler for login/signup button
  handleCheck = (e) => {
    this.setState({
      loginStatus: e.currentTarget.id,
    });
  };

  // handler for submittion on page
  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password, full_name, email } = ev.target;

    if (this.state.loginStatus === "/signin") {
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
    }
    else {
      auth
        .postUser({
          user_name: user_name.value,
          password: password.value,
          full_name: full_name.value,
          email: email.value,
          type: 'client'
        })
        .then((res) => {
          user_name.value = "";
          password.value = "";
          full_name.value = "";
          email.value = "";
          this.setState({statusMsg: "Registration complete. Feel free to login!"})
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });

    }
  };

  render() {
    // div section for copy buttons
    const copy = (
      <>
        <section className="copyBox">
          <span className="loginCopy">User: admin</span>
          <CopyToClipboard
            onCopy={() =>
              this.setState({ statusMsg: "Admin password was copied." })
            }
            text={"passwOrd1@"}
          >
            <button>Click here for password for admin.</button>
          </CopyToClipboard>
        </section>
        <section className="copyBox">
          <span className="loginCopy">User: client</span>
          <CopyToClipboard
            onCopy={() =>
              this.setState({ statusMsg: "Client password was copied." })
            }
            text={"passwOrd1@"}
          >
            <button>Click here for password for client.</button>
          </CopyToClipboard>
        </section>
      </>
    );

    return (
      <section className="dashboard">
        <span style={{marginTop: '12px'}}>{this.state.statusMsg}</span>
        <MsgBox msg={copy} />
        <form id="login" onSubmit={this.handleSubmitJwtAuth}>
          <small>{this.state.error}</small>
          <br></br>
          {this.state.loginStatus === "/signin" ? (
            <>
              <label htmlFor="user_name">Username:</label>
              <input
                type="text"
                onFocus={this.clearMessages}
                name="user_name"
                id="user_name"
              />
              <br />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                onFocus={this.clearMessages}
                name="password"
                id="password"
              />
              <br />
            </>
          ) : (
            <>
              <label htmlFor="user_name">Username:</label>
              <input
                type="text"
                onFocus={this.clearMessages}
                name="user_name"
                id="user_name"
              />
              <br />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                onFocus={this.clearMessages}
                name="password"
                id="password"
              />
              <br />
              <label htmlFor="full_name">Name of Brand:</label>
              <input
                type="text"
                onFocus={this.clearMessages}
                name="full_name"
                id="full_name"
              />
              <br />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                onFocus={this.clearMessages}
                name="email"
                id="email"
              />
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
                defaultChecked={this.state.loginStatus === "/signin"}
                name="signup"
                id="/signin"
              />
            </div>
            <div>
              <label htmlFor="signin">Sign Up:</label>
              <input
                type="radio"
                defaultChecked={this.state.loginStatus === "/signup"}
                onChange={this.handleCheck}
                name="signup"
                id="/signup"
              />
            </div>
          </div>
          <input className="button" type="submit" value="Submit"></input>
        </form>
      </section>
    );
  }
}

export default SignIn;
