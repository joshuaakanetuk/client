import React, { Component } from "react";
import serve from "../services/thing-api-service.js";
import token from "../services/token";

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
    this.setUser();
  }

  getProjects = () => {
    serve
      .getProjects()
      .then((data) => {
        this.setState({
          projects: data,
        });
      })
      .catch((err) => {
        token.clearAuthToken();
        token.clearUser();
        this.setState({
          error: true,
        });
      });
  };

  getNotes = (id) => {
    return serve
      .getProjectNotes(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        this.setState({
          error: true,
        });
      });
  };

  getProject = (id) => {
    return serve
      .getProject(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        token.clearAuthToken();
        token.clearUser();
        this.setState({
          error: true,
        });
      });
  }

  deleteNote(id) {
    return serve.deleteNote(id).then((data) => {
      return data;
    });
  }

  setUser = () => {
    let user = JSON.parse(token.getUser());

    if (user) {
      this.setState({
        id: user.user_id,
        typeUser: user.type,
      });
    }
  };

  submitProposal = (project, note) => {
    const initNote = {
      content: "proposed project",
      type: "changelog",
      date_created: new Date(),
      project_id: "",
    };

    return serve
      .insertProject(project)
      .then((data) => {
        this.setState({
          projects: [...this.state.projects, data],
        });
        return data;
      })
      .then((data) => {
        if (note.length > 0) this.updateNotes(data.id, note, "POST", "notes");
        return data;
      })
      .then((data) => {
        initNote.project_id = data.id;
        this.updateNotes(data.id, initNote.content, "POST", "changelog");
      })
      .catch((err) => console.log(err));
  };

  //update Proposal
  updateProposal = (id, data) => {
    const updatedNote = {
      content: "updated proposal",
      type: "changelog",
      date_created: new Date(),
      project_id: id,
    };

    const project = {
      proposal: data,
    };

    return serve
      .updateProject(id, project)
      .then((data) => {
        let projects = [...this.state.projects];
        let projectId = projects.filter((project) => project.id === data.id)[0];
        let projectoo = projects.indexOf(projectId);
        projects[projectoo] = data;
        this.setState({ projects });
        return data;
      })
      .then((data) => {
        return serve
          .insertNote(data.id, updatedNote)
          .then((data) => {
            return data;
          })
          .catch((err) => console.log(err));
      });
  };

  updateApproval = (id, meta, content) => {
    const updatedNote = {
      content,
      type: "changelog",
      date_created: new Date(),
      project_id: id,
    };

    const project = {
      approval: meta,
    };
    return serve
      .updateProject(id, project)
      .then((data) => {
        let projects = [...this.state.projects];
        let projectId = projects.filter((project) => project.id === data.id)[0];
        let projectoo = projects.indexOf(projectId);
        projects[projectoo] = data;
        this.setState({ projects });
        return data;
      })
      .then((data) => {
        return serve
          .insertNote(data.id, updatedNote)
          .then((data) => {
            return data;
          })
          .catch((err) => console.log(err));
      });
  };

  clearEvery = () => {
    this.setState({
      error: false,
    });
  };

  // notes
  updateNotes = (id, _note, action, type) => {
    const updatedNote = {
      content: _note,
      type: type,
      date_created: new Date(),
      project_id: id,
    };

    if (action === "POST") {
      return serve
        .insertNote(id, updatedNote)
        .then((data) => {
          return data;
        })
        .catch((err) => console.log(err));
    }

    if (action === "DELETE") {
      return serve
        .deleteNote(id, { _note })
        .then((data) => {
          return data;
        })
        .catch((err) => console.log(err));
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
      clearEvery: this.clearEvery,
    };
    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
