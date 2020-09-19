import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import serve from "../services/thing-api-service.js";
import token from '../services/token'

const AppContext = React.createContext({
  projects: [],
  typeUser: "client",
  error: null,
  setError: () => {},
  changeUserType: () => {},
  getNotes: () => {},
  getProject: () => {},
  updateNotes: () => {},
  deleteNote: () => {},
  updateApproval: () => {},
  submitProposal: () => {},
  updateProposal: () => {},
});

export default AppContext;

export class AppProvider extends Component {
  state = {
    typeUser: "client",
    projects: [],
    error: null,
    id: 1,
  };

  componentDidMount() {
    // projects 
    this.setUser()

  }

  getProjects = () => {
    serve.getProjects().then((data) => {
      this.setState({
        projects: data,
      });
    });
  }

  getNotes(id) {
    return serve
      .getProjectNotes(id)
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }

  getProject(id) {
    return serve.getProject(id).then((data) => {
      return data;
    });
  }

  deleteNote(id) {
    return serve.deleteNote(id).then((data) => {
      return data;
    });
  }

  setUser() {
    let user = JSON.parse(token.getUser());
    
    if(user) {
      this.setState({
        id: user.user_id,
        typeUser: user.type
      })
    }
    console.log(user)
  }

  submitProposal = (project) => {
    console.log(project);
    const { name, type, deliverables, cost, notes } = project;
    let newProject = {
      id: uuidv4(),
      name: name,
      status: "INITIAL",
      client_id: this.state.id,
      client_approval: true,
      admin_approval: false,
      timeframe: new Date(),
      notes: [
        {
          id: 1,
          content: "Project has moved to initial.",
          date: new Date(),
          type: "changelog",
        },
        {
          id: 2,
          content: notes,
          date: new Date(),
          type: "changelog",
        },
      ],
      type: type,
      date_proposed: new Date(),
      date_modified: new Date(),
      price: cost,
      deliverables: deliverables,
    };
    this.setState({ projects: [...this.state.projects, newProject] });
  };

  //  Demo exclusive functions
  // changeUserType = () => {
  //   const newUserType = this.state.typeUser === "client" ? "admin" : "client";
  //   this.setState({ typeUser: newUserType });
  //   console.log(this.state.typeUser);
  // };

  //update Proposal
  updateProposal = (id, url) => {
    // gets current projects
    let projects = [...this.state.projects];
    // get project adding/updating to
    let projectId = projects.filter((project) => project.id === id)[0];
    // get index for later
    let projectoo = projects.indexOf(projectId);

    let newP = { ...projectId };
    newP.proposal.url = url;

    console.log(newP);

    projects[projectoo] = newP;
    this.setState({ projects });
  };

  updateApproval = (id, meta, content) => {
    const project = {
      approval: meta
    }
    return serve.updateProject(id, project)
    .then((data) => {
      return data;
    });
  };

  clearEvery = () => {
    this.setState({
      projects: []
    })
  }

  // notes
  updateNotes = (id, _note, action, type) => {
    const updatedNote = {
      content: _note,
      type: type,
      date_created: new Date(),
      created_by: "client",
      project_id: id,
    };

    if (action === "POST") {
      return serve.insertNote(id, updatedNote)
      .then((data) => {
        return data;
      })
      .catch(err => console.log(err));
    }

    if (action === "DELETE") {
      return serve.deleteNote(id, {_note})
      .then((data) => {
        return data;
      })
      .catch(err => console.log(err));
    }

    console.log(id, _note, action, type);
  
  };

  render() {
    const value = {
      projects: this.state.projects,
      typeUser: this.state.typeUser,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      changeUserType: this.changeUserType,
      getNotes: this.getNotes,
      getProject: this.getProject,
      getProjects: this.getProjects,
      updateNotes: this.updateNotes,
      deleteNote: this.deleteNote,
      submitProposal: this.submitProposal,
      updateProposal: this.updateProposal,
      updateApproval: this.updateApproval,
      setUser: this.setUser,
      clearEvery: this.clearEvery
    };
    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
