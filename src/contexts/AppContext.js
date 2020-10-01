import React, { Component } from "react";
import serve from "../services/api.js";
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

  // after mounting set user
  componentDidMount() {
    this.setUser();
  }

  // function to get all of the projects
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

  // function to get all of the notes for a project
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

  // function to get project info
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
  };

  // function to delete a note
  deleteNote(id) {
    return serve.deleteNote(id).then((data) => {
      return data;
    });
  }


  // function to set state for conditional rendering
  setUser = () => {
    let user = JSON.parse(token.getUser());

    if (user) {
      this.setState({
        id: user.user_id,
        typeUser: user.type,
      });
    }
  };

  // function to submit new project to server
  submitProposal = (project, note) => {
    // create changelog
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
        return data;
      })
      .catch((err) => {
        return err;
      });
  };

  // function to update the url for a design proposal 
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
        serve
          .insertNote(data.id, updatedNote)
          .then((notes) => {})
          .catch((err) => console.log(err));
        return data;
      });
  };


// function to make an approval or decline a status
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
        serve
          .insertNote(data.id, updatedNote)
          .then((data) => {})
          .catch((err) => console.log(err));
        return data;
      });
  };


// function to clear error status
  clearError = () => {
    this.setState({
      error: false,
    });
  };

  // function to add or update notes
  updateNotes = (id, _note, action, type) => {
    const updatedNote = {
      content: _note,
      type: type,
      date_created: new Date(),
      project_id: id,
    };

    // add note
    if (action === "POST") {
      return serve
        .insertNote(id, updatedNote)
        .then((data) => {
          return data;
        })
        .catch((err) => console.log(err));
    }
    // delete note
    if (action === "DELETE") {
      return serve
        .deleteNote(id, { _note })
        .then((data) => {
          return data;
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    const value = {
      projects: this.state.projects,
      typeUser: this.state.typeUser,
      error: this.state.error,
      setError: this.setError,
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
      clearError: this.clearError,
    };
    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
