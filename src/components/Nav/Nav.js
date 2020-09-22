import React from "react";
import { Link, withRouter } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import Permission from "../Permission/Permission";
import token from "../../services/token";

class Nav extends React.Component {
  static contextType = AppContext;
  render() {
    const { location } = this.props;
    const landingNav = (
      <nav>
        <span onClick={() => {
            this.props.history.push("/");
          }}
          className="logo">Unknown Labs</span>
        <div className="links">
          <Link to="/login">Sign In / Sign Up</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>
    );

    const dashboardNav = (
      <nav>
        <span onClick={() => {
            this.props.history.push("/");
          }}
          className="logo">Unknown Labs</span>
        <div className="links">
        <Link to="/dashboard">Home</Link>
        <Permission>
          <Link to="/dashboard/clients">Clients</Link>
        </Permission>
        <Link to=""
          onClick={() => {
            token.clearAuthToken();
            token.clearUser();
            this.context.clearEvery();
            this.props.history.push("/");
          }}
        >
          Leave App
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
