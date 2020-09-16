import React from "react";
import { Link, withRouter } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import Permission from "../Permission/Permission";

class Nav extends React.Component {
  static contextType = AppContext;
  render() {
    const { location } = this.props;
    const landingNav = (
      <nav>
        <Link to="/">Home Page </Link>
        <Link to="/signin">Sign In / Sign Up</Link>
        <Link to="/dashboard">Dashboard</Link>
        <div className="avatar">
        {this.context.typeUser.toUpperCase()[0]}
        </div>
      </nav>
    );

    const dashboardNav = (
      <nav>
        <Link to="/">Leave App </Link>
        <Link to="/dashboard">Home</Link>
        <Link to="/dashboard/projects">Projects</Link>
        <Permission>
          <Link to="/dashboard/clients">Clients</Link>
        </Permission>
        {/* <Link to="/dashboard/chat" className="disabled-link">
          Chat
        </Link> */}
        <div className="avatar">
        {this.context.typeUser.toUpperCase()[0]}
        </div>
      </nav>
    );

    return (
      <>{location.pathname.includes("dashboard") ? dashboardNav : landingNav}</>
    );
  }
}

export default withRouter(Nav);
