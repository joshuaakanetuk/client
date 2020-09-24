import React from "react";
import AppContext from "../../../contexts/AppContext";
import Iframe from "react-iframe";
import Permission from "../../Permission/Permission";
import { Clock, DollarSign, X } from "react-feather";
import { formatDistance } from "date-fns";

class ProjectDetail extends React.Component {
  static contextType = AppContext;
  state = {
    project: {
      id: "",
      name: "",
      status: "",
      admin_approval: "",
      client_approval: "",
      start_timeframe: "",
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
    this.context.getProject(this.props.match.params.projectId).then((data) => {
      this.setState({
        project: data,
      });
    });
    this.context.getNotes(this.props.match.params.projectId).then((data) => {
      this.setState({ notes: data });
    });
  }
  goBack = () => {};
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { match, history } = this.props;
    let project =
      this.context.projects.filter(
        (project) => project.id === match.params.projectId
      )[0] || this.state.project;
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
        <div
          style={{
            border: "white 1px solid",
            padding: "6px 8px",
            borderRadius: "4px",
          }}
          onClick={() => history.goBack()}
        >
          Back
        </div>
        <small>Status: {project.status}</small>
        {project.admin_approval === true ? (
          <>
            <br></br>
            <small>Admin has signed off.</small>
          </>
        ) : (
          <>
            <br></br>
            <small>Needs freelancer approval.</small>
          </>
        )}
        {project.client_approval === true ? (
          <>
            <br></br>
            <small>Client has signed off.</small>
          </>
        ) : (
          <>
            <br></br>
            <small>Needs client approval.</small>
          </>
        )}
        <h1 className="">{project.name}</h1>
        <div
          style={{
            width: "80%",
            display: "flex",
            marginTop: "-20px",
            fontSize: "20px!important",
            justifyContent: "center",
          }}
        >
          <div style={{ alignItems: "center" }}>
            <Clock size={12} />
            {project.end_timeframe && project.end_timeframe.length > 0
              ? formatDistance(new Date(), new Date(project.end_timeframe)) +
                ` ago.`
              : ""}
          </div>
          <div>
            {<DollarSign size={12} />}
            Price: {project.price}
          </div>
        </div>
        {project.proposal && project.proposal.length > 0 ? (
          <>
            <Iframe
              url={project.proposal}
              // width={800}
              height={450}
            />
          </>
        ) : (
          ""
        )}
        <Permission>
          {project.status.length > 0 &&
          project.status !== "INITAL" &&
          project.proposal ? (
            <>
              <input
                name="proposalUrl"
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
              <button
                onClick={() =>
                  this.context.updateProposal(
                    project.id,
                    this.state.proposalUrl
                  )
                }
              >
                Update Design Proposal{" "}
              </button>
            </>
          ) : (
            ""
          )}
        </Permission>
        <div className="project__approval">
          {project[this.context.typeUser + `_approval`] !== true ? (
            <>
              <button
                onClick={() => {
                  const approval = false;
                  this.context.updateApproval(
                    project.id,
                    approval,
                    "I hate this."
                  );
                }}
              >
                Decline
              </button>
              <button
                onClick={() => {
                  const approval = true;
                  this.context.updateApproval(
                    project.id,
                    approval,
                    "I love this."
                  );
                }}
              >
                Approve
              </button>
            </>
          ) : (
            ""
          )}
        </div>
        <h3>Type: {project.type}</h3>
        <div className="project_deliverables">
          <h3>Deliverables:</h3>
          <ul className="project_deliverables list">
            {project.deliverables.length > 0
              ? project.deliverables.split(",").map((deliver, i) => {
                  return <li key={i}>{deliver}</li>;
                })
              : ""}
          </ul>
        </div>
        <div className="project__notes">
          <span>Notes:</span>
          {this.state.notes.map((_note, i) => {
            if (_note.type === "notes")
              return (
                <div key={i} className="project__note">
                  <div className="project__content">{_note.content}</div>
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
            Submit Notes
          </button>
        </div>
        <div className="project__changelog">
          <span>Changelog:</span>
          {this.state.notes.map((notes, i) => {
            if (notes.type === "changelog")
              return (
                <div key={i} className="project__change">
                  <div className="project__content">{notes.content}</div>
                  <span>{notes.date_created.toString()}</span>
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
