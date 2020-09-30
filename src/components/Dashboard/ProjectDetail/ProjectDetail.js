import React from "react";
import AppContext from "../../../contexts/AppContext";
import Iframe from "react-iframe";
import Permission from "../../Permission/Permission";
import { Clock, DollarSign, X, Edit } from "react-feather";
import { format } from "date-fns";
import validator from "validator";

class ProjectDetail extends React.Component {
  static contextType = AppContext;
  state = {
    project: {
      id: "",
      name: "",
      status: "",
      admin_approval: "",
      client_approval: "",
      end_timeframe: "",
      proposal: "",
      notes: [],
      deliverables: " ",
    },
    notes: [],
    changelog: "",
    note: "",
    proposalUrl: "",
    feedback: "",
  };
  componentDidMount() {
    this.getProject();
    this.getNotes();
  }

  getProject = () => {
    this.context.getProject(this.props.match.params.projectId).then((data) => {
      this.setState({
        project: data,
      });
    });
  };

  getNotes = () => {
    this.context.getNotes(this.props.match.params.projectId).then((data) => {
      this.setState({ notes: data });
    });
  };

  handleProposal = (e) => {
    let inputValue = e.target.value;
    let project = Object.assign({}, this.state.project);
    project["proposal"] = inputValue;
    console.log(project);
    this.setState({
      project,
    });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { match } = this.props;
    let project =
      this.context.projects.filter(
        (project) => project.id === match.params.projectId
      )[0] || this.state.project;

    const renderStatus = () => {
      let client;
      let admin;
      if (
        this.state.project.status === "INITIAL" ||
        this.state.project.status === "DESIGN"
      ) {
        admin =
          this.state.project.admin_approval === true ? (
            <>
              <br></br>
              <small>Admin has signed off.</small>
            </>
          ) : (
            <>
              <br></br>
              <small>Needs freelancer approval.</small>
            </>
          );

        client =
          this.state.project.client_approval === true ? (
            <>
              <br></br>
              <small>Client has signed off.</small>
            </>
          ) : (
            <>
              <br></br>
              <small>Needs client approval.</small>
            </>
          );
        return (
          <>
            {client}
            {admin}
          </>
        );
      }
    };

    const renderApproval = () => {
      let approve;

      approve =
        project[this.context.typeUser + `_approval`] !== true ? (
          <div className="project__approval">
            <button
              onClick={() => {
                const approval = false;
                this.context
                  .updateApproval(project.id, approval, "declined")
                  .then((data) => {
                    this.setState({ project: data });
                    this.getNotes();
                  })
                  .catch((err) => console.log(err));
              }}
            >
              Decline
            </button>
            <button
              onClick={() => {
                const approval = true;
                this.context
                  .updateApproval(project.id, approval, "approved")
                  .then((data) => {
                    this.setState({ project: data });
                    this.getNotes();
                  })
                  .catch((err) => console.log(err));
              }}
            >
              Approve
            </button>
          </div>
        ) : (
          ""
        );

      if ((this.context.typeUser === 'client') &&
        (this.state.project.status === "INITIAL" ||
        this.state.project.status === "DESIGN")
      ) {
        return approve
      }
      else if((this.context.typeUser === 'admin') && this.state.project.status !== "FINISHED")
      {
        return approve
      }
      return;
    };

    return (
      <div
        style={{
          padding: "25px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <div className="project__info">
          <h1 className="">{project.name}</h1>
          <h3>Type: {project.type}</h3>
          <small>Status: {project.status}</small>

          {renderStatus()}

          <div
            className="m24"
            style={{
              display: "flex",
              fontSize: "20px!important",
              justifyContent: "space-between",
            }}
          >
            <div style={{ alignItems: "center" }}>
              <Clock size={12} />
              {project.end_timeframe && project.end_timeframe.length > 0
                ? ` Due: ` + format(new Date(project.end_timeframe), "PPP")
                : ""}
            </div>
            <div>
              {<DollarSign size={12} />}
              Price: {project.price}
            </div>
          </div>
        </div>

        {project.proposal && project.proposal.length > 0 ? (
          <>
            <Iframe className="m12" url={project.proposal} height={450} />
          </>
        ) : (
          ""
        )}
        {renderApproval()}
        <Permission>
          {project.status.length > 0 && project.status === "DESIGN" ? (
            <>
              Proposal URL (add URL and update):
              <div className="proposal__input m12">
                <input
                  value={this.state.project.proposal}
                  name="proposal"
                  onChange={(e) => {
                    this.handleProposal(e);
                  }}
                />
                <div
                  onClick={() =>
                    this.context
                      .updateProposal(project.id, this.state.project.proposal)
                      .then((data) => {
                        this.getNotes();
                      })
                      .catch((err) => console.log(err))
                  }
                >
                  <Edit alt="Submit" width={16} />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </Permission>
        <div className="project_deliverables">
          <h4>Deliverables:</h4>
          <ul className="project_deliverables list">
            {project.deliverables.length > 0
              ? project.deliverables.split(",").map((deliver, i) => {
                  return <li key={i}>{deliver}</li>;
                })
              : ""}
          </ul>
        </div>
        <div className="project__notes">
          <h4 className="m12">Notes:</h4>
          {this.state.notes.map((_note, i) => {
            if (_note.type === "notes")
              return (
                <div key={i} className="project__note">
                  <div className="project__content">
                    {_note.content} ({_note.created_by})
                  </div>
                  <X
                    onClick={(e) =>
                      this.context
                        .updateNotes(project.id, _note.id, "DELETE", "notes")
                        .then((data) => {
                          this.setState({
                            notes: this.state.notes.filter(
                              (note) => note.id !== _note.id
                            ),
                          });
                        })
                        .catch((err) => {
                          console.log(err);
                        })
                    }
                  />
                </div>
              );
            else return null;
          })}
          <textarea
            className="m12"
            placeholder="Add a note!"
            value={this.state.note}
            name="note"
            onChange={(e) => {
              this.handleChange(e);
            }}
          />
          <button
            style={{ float: "right" }}
            value="Submit Notes"
            onClick={(e) => {
              if (this.state.note.length > 0) {
                this.context
                  .updateNotes(project.id, this.state.note, "POST", "notes")
                  .then((data) => {
                    this.setState({
                      notes: [...this.state.notes, data],
                    });
                  })
                  .catch((err) => console.log(err));
              }

              this.setState({
                note: "",
              });
            }}
          >
            Submit Note
          </button>
        </div>
        <div className="project__changelog">
          <h4 className="m12">Changelog:</h4>
          {this.state.notes.map((notes, i) => {
            if (notes.type === "changelog")
              return (
                <div key={i} className="project__change">
                  <div className="project__content">{notes.content}</div>
                  <span className="project__date">{format(new Date(notes.date_created), "PPpp")}</span>
                </div>
              );
            else return null;
          })}
        </div>
      </div>
    );
  }
}

export default ProjectDetail;
