import React from "react";
import { Link, withRouter } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
// import Permission from "../Permission/Permission";
import token from "../../services/token";

class Nav extends React.Component {
  static contextType = AppContext;
  render() {
    const { location } = this.props;
    const landingNav = (
      <nav>
        <span
          onClick={() => {
            this.props.history.push("/");
          }}
          className="logo"
        >
          Unknown Labs
        </span>
        <div className="links">
          {token.getAuthToken() ? (
            <>
            <Link to="/dashboard">Dashboard</Link>
              <Link
                to=""
                onClick={() => {
                  token.clearAuthToken();
                  token.clearUser();
                  this.context.clearEvery();
                  this.props.history.push("/");
                }}
              >
                Logout
              </Link>
              
            </>
          ) : (
            <>
              <Link status="siginin" to="/signin">
                Login
              </Link>
              <Link status="signup" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    );

    const dashboardNav = (
      <nav>
        <span
          onClick={() => {
            this.props.history.push("/");
          }}
          className="logo"
        >
          Unknown Labs
        </span>
        <div className="links">
        <Link to="/dashboard">Dashboard</Link>
          <Link
            to=""
            onClick={() => {
              token.clearAuthToken();
              token.clearUser();
              this.context.clearEvery();
              this.props.history.push("/");
            }}
          >
            Logout
          </Link>
          
        </div>
      </nav>
    );

    return (
      <>{location.pathname.includes("dashboard") ? dashboardNav : landingNav}</>
    );
  }
}

export default withRouter(Nav);
