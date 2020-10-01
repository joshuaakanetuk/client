import React from "react";
import AppContext from "../../../contexts/AppContext";
import Permission from "../../Permission/Permission";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

// types of products
const types = [
  "Single Product Store",
  "Online Store",
  "Blogging Platform",
  "Portfolio",
];

// type of deliverables
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
    error: null,
    name: "",
    type: "",
    deliverables: [],
    deliverArr: [],
    cost: 0,
    notes: "",
    typeSelected: "",
    selectedDay: null,
  };
  // handle on click of type 
  typeSelect = (e) => {
    this.setState({
      typeSelected: Number(e.currentTarget.dataset.key),
    });
  };
  // handle date on click
  handleDayClick = (day, selected = {}) => {
    if (selected.disabled) {
      return;
    }
    this.setState({
      selectedDay: selected.selected ? undefined : day,
    });
  };
  // handle deliverables on click
  selected = (e) => {
    const deliverArr = this.state.deliverArr;
    let index;
    let newCost = 0;

    if (
      this.state.deliverables.indexOf(Number(e.currentTarget.dataset.key)) ===
      -1
    ) {
      this.setState({
        deliverables: [
          ...this.state.deliverables,
          Number(e.currentTarget.dataset.key),
        ],
      });
      deliverArr.push(deliverablesTypes[Number(e.currentTarget.dataset.key)]);
    } else {
      this.setState({
        deliverables: this.state.deliverables.filter(
          (del) => del !== Number(e.currentTarget.dataset.key)
        ),
      });
      index = deliverArr.indexOf(
        deliverablesTypes[Number(e.currentTarget.dataset.key)]
      );
      deliverArr.splice(index, 1);
    }

    this.state.deliverArr.forEach((element) => {
      newCost = newCost + element.cost;
    });

    this.setState({
      cost: newCost,
    });
  };
  // handle text changing on first level state variables
  handleChangeString = (element, value) => {
    this.setState({ [value.target.name]: value.target.value });
  };
  render() {
    return (
      <>
        <form
          style={{
            width: "80%",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            const project = {
              name: this.state.name,
              type: types[this.state.typeSelected],
              status: "INITIAL",
              admin_approval: false,
              client_approval: true,
              end_timeframe: this.state.selectedDay,
              price: this.state.cost,
              proposal: null,
              date_created: new Date(),
              user_id: null,
              deliverables: this.state.deliverArr
                .map((del) => del.name)
                .toString(),
            };

            this.context
              .submitProposal(project, this.state.notes)
              .then((data) => {
                if('error' in data) throw data.error
                this.props.history.push("/dashboard");
                alert("Submitted proposal successfully!");
              })
              .catch((err) => {
                this.setState({
                  error: err.message
                })
              });
          }}
        >
          <h1>Create Proposal</h1>
          <h2>Name of Project</h2>
          <input
            id="project__name"
            required
            type="text"
            name="name"
            onChange={(e) => this.handleChangeString("name", e)}
          />
          <h2>Type of Project</h2>
          <div className="types">
            {types.map((type, i) => {
              return (
                <div
                  key={i}
                  data-key={i}
                  className={
                    this.state.typeSelected === i
                      ? "typeblock typeblock__selected"
                      : "typeblock"
                  }
                  onClick={(e) => this.typeSelect(e)}
                >
                  <span>{type}</span>
                </div>
              );
            })}
          </div>
          <h2>Deliverables</h2>
          <div>
            <div className="project___proposal deliver">
              {deliverablesTypes.map((deliver, i) => {
                return (
                  <div
                    key={i}
                    data-key={i}
                    className={
                      this.state.deliverables.indexOf(i) !== -1
                        ? "delblock delblock__selected"
                        : "delblock"
                    }
                    onClick={(e) => this.selected(e)}
                  >
                    <span>
                      {deliver.emoji} — {deliver.name}
                    </span>
                    <span className="delivercost">${deliver.cost}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <label>Notes for Freelancer:</label>
            <br />
            <br />
            <textarea
              id="textareanotes"
              name="notes"
              onChange={(e) => {
                this.handleChangeString("notes", e);
              }}
            />
          </div>
          <div className="projecttime">
            <h2>When is this due?</h2>
            <DayPicker
              disabledDays={{ before: new Date() }}
              onDayClick={this.handleDayClick}
            />
            <div>
              {this.state.selectedDay
                ? this.state.selectedDay.toLocaleDateString()
                : "Please select a day 👻"}
            </div>
          </div>

          <br />
          {this.state.error}
          <br />
          <h1>
            <span aria-label="money" role="img">
              💸
            </span>{" "}
            Estimated cost: ${this.state.cost} USD
          </h1>
          <input className="button" type="submit" />
        </form>
        <Permission>
          You are an admin and don't need to submit proposals to yourself!
        </Permission>
      </>
    );
  }
}

export default Proposal;
