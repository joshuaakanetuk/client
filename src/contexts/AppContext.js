import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Projects from "../STORE";

const AppContext = React.createContext({
  projects: [],
  typeUser: "client",
  error: null,
  setError: () => {},
  changeUserType: () => {},
  updateNotes: () => {},
  updateApproval: () => {},
  submitProposal: () => {},
  updateProposal: () => {},
});

export default AppContext;

export class AppProvider extends Component {
  state = {
    typeUser: "client",
    projects: Projects,
    error: null,
    id: 1,
  };

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
  changeUserType = () => {
    const newUserType = this.state.typeUser === "client" ? "admin" : "client";
    this.setState({ typeUser: newUserType });
    console.log(this.state.typeUser);
  };

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

  updateApproval = (id, status, feedback) => {
    console.log(status);
    // gets current projects
    let projects = [...this.state.projects];
    // get project adding/updating to
    let projectId = projects.filter((project) => project.id === id)[0];
    // get index for later
    let projectoo = projects.indexOf(projectId);
    let newP = { ...projectId };

    if (status === 0) {
      newP[`client_approval`] = false;
      newP[`admin_approval`] = false;
      newP.notes.push({
        id: projectId.notes.length + 1,
        content: this.state.typeUser + " has declined.",
        date: new Date(),
        type: "changelog",
      });
      newP.notes.push({
        id: projectId.notes.length + 1,
        content: feedback,
        date: new Date(),
        type: "feedback",
      });
    } 
    if (status === 1) {
      console.log(status, this.state.typeUser)
      newP[this.state.typeUser + `_approval`] = true;
      if (feedback) {
        newP.notes.push({
          id: projectId.notes.length + 1,
          content: feedback,
          date: new Date(),
          type: "feedback",
        });
      }
      newP.notes.push({
        id: projectId.notes.length + 1,
        content: this.state.typeUser + " has approved.",
        date: new Date(),
        type: "changelog",
      });
      if (newP.client_approval && newP.admin_approval) {
        newP.status = "DESIGN";
        newP.notes.push({
          id: projectId.notes.length + 1,
          content: "Project has moved to design.",
          date: new Date(),
          type: "changelog",
        });
        newP.admin_approval = null;
        newP.client_approval = null;
      }
    } 
    if (status === 2) {
      newP[`client_approval`] = false;
      newP[`admin_approval`] = false;
    }

    projects[projectoo] = newP;
    this.setState({ projects });
  };

  // notes
  updateNotes = (id, _note, action, type) => {
    // gets current projects
    let projects = [...this.state.projects];
    // get project adding/updating to
    let projectId = projects.filter((project) => project.id === id)[0];
    // get index for later
    let projectoo = projects.indexOf(projectId);

    if (action === "POST") {
      // push to array
      projectId.notes.push({
        id: projectId.notes.length + 1,
        content: _note,
        date: new Date(),
        type: type,
      });
    }

    if (action === "DELETE") {
      let updatedNotes = projectId.notes.findIndex((note) => note.id === _note);
      // push to array
      projectId.notes.splice(updatedNotes, 1);
    }

    projects[projectoo] = projectId;
    this.setState({ projects });
  };

  render() {
    const value = {
      projects: this.state.projects,
      typeUser: this.state.typeUser,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      changeUserType: this.changeUserType,
      updateNotes: this.updateNotes,
      submitProposal: this.submitProposal,
      updateProposal: this.updateProposal,
      updateApproval: this.updateApproval,
    };
    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
