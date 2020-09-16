import React from "react";
import AppContext from "../../../contexts/AppContext";
import { NavLink } from "react-router-dom";
import Permission from "../../Permission/Permission";
import { formatDistance } from 'date-fns';

class Project extends React.Component {
  static contextType = AppContext;

  render() {
    const { match, project } = this.props;
    return (
        <NavLink className="project" to={`/dashboard/projects/` + project.id}>
          <div className="project__name">{project.name}</div>
          <div className="project__status">{project.status}</div>
          <div>{formatDistance(new Date(project.start_timeframe), new Date()) + ` ago.`}</div>
          <Permission>
          <div style={{color: 'green'}}>${project.price} USD</div>
          </Permission>
        </NavLink>
    );
  }
}

export default Project;
