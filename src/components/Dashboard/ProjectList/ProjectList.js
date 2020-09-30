import React from 'react'
import { withRouter } from 'react-router-dom'
import Project from '../Project/Project'
import AppContext from "../../../contexts/AppContext";

// gimme an array prefiltered and this basically becomes 

class ProjectList extends React.Component{
    static contextType = AppContext;
    static defaultProps = {
        projects: []
    }
    render() {
        return(
            <div className="project__list">
                {[...this.props.projects].reverse().map((project, i) => <Project project={project} key={i} />)}
            </div>
        );
    }
}

export default withRouter(ProjectList);