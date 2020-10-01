import React from "react";
import { Link, withRouter } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import token from "../../services/token";

class Nav extends React.Component {
  static contextType = AppContext;
  render() {
    const { location } = this.props;
    // navigation for landing page/non app pages
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
            {/* hacky way to kind styling and also have a href */}
              <Link
                to=""
                onClick={() => {
                  token.clearAuthToken();
                  token.clearUser();
                  this.context.clearError();
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
    // navigation for dashboard app      
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
        {/* hacky way to kind styling and also have a href */}
          <Link
            to=""
            onClick={() => {
              token.clearAuthToken();
              token.clearUser();
              this.context.clearError();
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
