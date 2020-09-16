import React from "react";
import { Route, Switch } from "react-router-dom";
import Proposal from "./Proposal/Proposal";
import ProjectList from "./ProjectList/ProjectList";
import ProjectDetail from "./ProjectDetail/ProjectDetail";
import AppContext from "../../contexts/AppContext";
import Permission from "../Permission/Permission";

class Dashboard extends React.Component {
  static contextType = AppContext;
  render() {
    let adminList = this.context.projects.filter(
      (project, i) =>
        project.status === "INITIAL" || project.status === "DESIGN"
    );

    let clientList = this.context.projects.filter(
      (project, i) =>
        project.status === "INITIAL" ||
        (project.status === "DESIGN" && project.user_id === this.context.id)
    );

    return (
      <div className="dashboard">
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={() => (
              <>
                {`Welcome back, You have ${this.context.projects.length} projects.`}

                <Permission>
                  <ProjectList projects={adminList} />
                </Permission>

                <Permission override={true}>
                  <ProjectList projects={clientList} />
                </Permission>
              </>
            )}
          />
          <Route exact path="/dashboard/proposal" component={Proposal} />
          <Route
            exact
            path="/dashboard/projects"
            render={(props) => {
              return (
                <>
                  <ProjectList projects={this.context.projects} />
                  <Permission override={true}>
                    <div
                      onClick={() =>
                        this.props.history.push("/dashboard/proposal")
                      }
                      className="proposal__link"
                    >
                      <div>Submit Proposal For New Project</div>
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
      </div>
    );
  }
}

export default Dashboard;
