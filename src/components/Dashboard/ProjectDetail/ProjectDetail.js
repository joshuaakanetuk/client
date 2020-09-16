import React from "react";
import AppContext from "../../../contexts/AppContext";
import Iframe from "react-iframe";
import Permission from "../../Permission/Permission";
import { Clock, DollarSign } from "react-feather";
import { format, formatDistance } from "date-fns";

class ProjectDetail extends React.Component {
  static contextType = AppContext;
  state = {
    project: {
      id: '',
      name: '',
      status: '',
      admin_approval: '',
      client_approval: '',
      start_timeframe: '',
      proposal: '',
      notes: [],
      deliverables: []

    },
    notes: [],
    changelog: "",
    note: "",
    proposalUrl: "",
    feedback: "",
  };
  componentDidMount() {  
    this.context.getProject(1)
      .then(data => {
        console.log(data)
        // this.setState({ notes: data})
      }) 
    this.context.getNotes("1")
      .then(data => {
        this.setState({ notes: data})
      })
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    
    const { match, history } = this.props;
    let project = this.context.projects.filter(
      (project) => project.id === match.params.projectId
    )[0];

      console.log(project)

    if (project == undefined) {
      project = this.state.project;
    }
    
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <button onClick={() => history.goBack()}>Back</button>
        <br />
        <small style={{ color: "gray" }}>{project.id}</small>
        <br />
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
            {/* {formatDistance(new Date(project.start_timeframe), new Date()) + ` ago.`} */}
          </div>
          <div>
            {<DollarSign size={12} />}
            Price: {project.price}
          </div>
        </div>
        {project.proposal && project.proposal.url.length > 0 ? (
          <>
            <Iframe
              // url={project.proposal.url}
              // width={project.proposal.width}
              // height={project.proposal.height}
            />
          </>
        ) : (
          ""
        )}
        <Permission>
          {project.status !== "INITAL" && project.proposal ? (
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

        <span>Feedback:</span>
        {this.state.notes.map((notes) => {
          if (notes.type === "feedback")
            return (
              <div className="project__feedback">
                {notes.content}
                <input
                  onClick={
                    (e) =>
                      this.context.updateNotes(
                        project.id,
                        notes.id,
                        "DELETE",
                        "feedback"
                      )
                    // id, obj, action
                  }
                  type="button"
                  value="Submit"
                />
              </div>
            );
          else return null;
        })}
        {project[this.context.typeUser + `_approval`] === false ? (
          <>
            <br></br>
            <textarea></textarea>
            <br></br>
            <button
              onClick={() => {
                this.context.updateApproval(
                    project.id,
                  0,
                  "I hate this."
                );
              }}
            >
              Decline
            </button>
            <button
              onClick={() => {
                this.context.updateApproval(
                  project.id,
                  1,
                  "I love this."
                );
              }}
            >
              Approve
            </button>
            <button
              onClick={() => {
                this.context.updateApproval(
                    project.id,
                  2,
                  "I'm okay with this."
                );
              }}
            >
              Change
            </button>
          </>
        ) : (
          ""
        )}
        <h3>Type: {project.type}</h3>
        {/* DELIVERABLES */}
        {/* <div className="project_deliverables">
            <h3>Deliverables</h3>
          {project.deliverables.map((deliver) => {
            return <div>{deliver.emoji}: {deliver.name}</div>;
          })}
        </div> */}
        <div className="project__changelog">
          <span>Changelog:</span>
          {this.state.notes.map((notes, i) => {
            if (notes.type === "changelog")
              return (
                <div key={i} className="project__change">
                  {notes.content}
                  {/* {change.date.toString()} */}
                  <Permission>
                    <input
                      onClick={
                        (e) =>
                          this.context.updateNotes(
                            project.id,
                            notes.id,
                            "DELETE"
                          )
                        // id, obj, action
                      }
                      type="button"
                      value="Submit"
                    />
                  </Permission>
                </div>
              );
            else return null;
          })}
        </div>
        <Permission>
          <div>
            <label>Add to changelog</label>
            <br />
            <input
              name="changelog"
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <input
              onClick={(e) =>
                this.context.updateNotes(
                  project.id,
                  this.state.changelog,
                  "POST",
                  "changelog"
                )
              }
              type="button"
              value="Submit"
            />
          </div>
        </Permission>
        <div className="project__notes">
          <span>Notes:</span>
          {this.state.notes.map((notes) => {
            if (notes.type === "notes")
              return (
                <div className="project__change">
                  {notes.content}
                  {/* {change.date.toString()} */}
                  <input
                    onClick={
                      (e) =>
                        this.context.updateNotes(
                          project.id,
                          notes.id,
                          "DELETE",
                          "notes"
                        )
                      // id, obj, action
                    }
                    type="button"
                    value="Submit"
                  />
                </div>
              );
            else return null;
          })}
        </div>
        <div>
          <label>Add a note.</label>
          <br />
          <textarea
            name="note"
            onChange={(e) => {
              this.handleChange(e);
            }}
          />
          <input
            onClick={(e) =>
              this.context.updateNotes(
                project.id,
                this.state.note,
                "POST",
                "notes"
              )
            }
            type="button"
            value="Submit"
          />
        </div>
      </div>
    );
  }
}

export default ProjectDetail;
