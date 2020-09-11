import React from "react";
import AppContext from "../../../contexts/AppContext";
import Permission from "../../Permission/Permission";

// auto pricing logic here
const types = [
  "Single Product Store",
  "Online Store",
  "Blogging Platform",
  "Portfolio",
];

const deliverablesTypes = [
  {
    name: "Shopify",
    cost: 29,
    emoji: "🛍️",
  },
  {
    name: "Bigcartel",
    cost: 10,
    emoji: "🛒",
  },
  {
    name: "Domain + Email",
    cost: 30,
    emoji: "✉️",
  },
  {
    name: "CMS",
    cost: 199,
    emoji: "🧰",
  },
  {
    name: "Documentation",
    cost: 99,
    emoji: "📗",
  },
  {
    name: "Walk Through Zoom Meeting",
    cost: 299,
    emoji: "👪",
  },
  {
    name: "Post Deployment Support",
    cost: 299,
    emoji: "🤙🏿",
  },
];

class Proposal extends React.Component {
  static contextType = AppContext;
  state = {
    name: "",
    type: "",
    deliverables: [],
    cost: 0,
    notes: ''
  };
  handleChangeString = (element, value) => {
    this.setState({ [value.target.name]: value.target.value });
  };
  handleDeliver = (e) => {
    const deliverables = this.state.deliverables;
    let index;
    let newCost = 0;
    // check if the check box is checked or unchecked
    if (e.target.checked) {
        // add the numerical value of the checkbox to options array
        deliverables.push(deliverablesTypes[e.target.value])
      } else {
        // or remove the value from the unchecked checkbox from the array
        index = deliverables.indexOf(deliverablesTypes[e.target.value])
        deliverables.splice(index, 1)
      }
  

    this.setState({
      deliverables: deliverables
    });
    
    this.state.deliverables.forEach((element) => {
        newCost = newCost + element.cost;
    });

    this.setState({
        cost: newCost
    })
  };
  render() {
    return (
      <>
        <Permission override={true}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              this.context.submitProposal(this.state);
              this.props.history.push("/dashboard/projects");
              alert('Submitted proposal successfully!')
            }}
          >
            <h1>Create Proposal</h1>
            <h2>Name of Project</h2>
            <input
              required
              type="text"
              name="name"
              onChange={(e) => this.handleChangeString("name", e)}
            />
            <h2>Type of Project</h2>
            {/* quick idea draft */}
            {/* <div className="project___proposal typelist">
                    {types.map(type => {
                        return(
                            <div className="typeoption">
                                <div>{type}</div>
                            </div>
                        )
                    })}

                </div> */}
            <div className="">
              {types.map((type) => {
                return (
                  <>
                    <label>{type}</label>
                    <input
                      required
                      type="radio"
                      name="type"
                      onChange={(e) => this.handleChangeString("name", e)}
                      value={type}
                    />
                    <br />
                  </>
                );
              })}
            </div>
            <h2>Deliverables</h2>
            <div className="project___proposal deliver">
              {deliverablesTypes.map((deliver, i) => {
                return (
                  <div className="">
                    <span>
                      {deliver.emoji} — {deliver.name}
                    </span>
                    <input
                      type="checkbox"
                      name="getChecked"
                      onChange={(e) => this.handleDeliver(e)}
                      value={i}
                      id="r1"
                    ></input>
                  </div>
                );
              })}
            </div>
            <br />
            <div>
                <label>Notes for Freelancer:</label><br />
                <textarea name="notes" onChange={(e) => {this.handleChangeString('notes', e)}} />
                </div> 
            <br />
            <br />
            <span>
              <span aria-label="money" role="img">
                💸
              </span>{" "}
              Estimated cost: ${this.state.cost} USD
            </span>
            <input type="submit" />
          </form>
        </Permission>
        <Permission>
          You are an admin and don't need to submit proposals to yourself!
        </Permission>
      </>
    );
  }
}

export default Proposal;
