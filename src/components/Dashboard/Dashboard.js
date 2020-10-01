import React from "react";
import { Route, Switch } from "react-router-dom";
import Proposal from "./Proposal/Proposal";
import ProjectList from "./ProjectList/ProjectList";
import ProjectDetail from "./ProjectDetail/ProjectDetail";
import AppContext from "../../contexts/AppContext";
import Permission from "../Permission/Permission";
import MsgBox from "../MsgBox/MsgBox";
import { Plus } from "react-feather";


class Dashboard extends React.Component {
  static contextType = AppContext;

  // on load of page get user and project
  componentDidMount() {
    this.context.setUser();
    this.context.getProjects()
  }

  render() {
    return (
      // either dashboard, proposal or project detail
      <section className="dashboard">
        <Switch>
          <Route exact path="/dashboard/proposal" component={Proposal} />
          <Route
            exact
            path="/dashboard"
            render={(props) => {
              return (
                <>
                  <MsgBox />
                  <ProjectList projects={this.context.projects} />
                  <Permission override={true}>
                    <div
                      onClick={() =>
                        this.props.history.push("/dashboard/proposal")
                      }
                      className="proposal__link"
                    >
                      <Plus size={32}/>
                    </div>
                  </Permission>
                </>
              );
            }}
          />
          <Route
            exact
            path="/dashboard/projects/:projectId"
            component={ProjectDetail}
          />
        </Switch>
      </section>
    );
  }
}

export default Dashboard;
