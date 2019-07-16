import React from "react";

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.agree = this.agree.bind(this);
    this.disagree = this.disagree.bind(this);
    this.localStorageUpdated = this.localStorageUpdated.bind(this);
    this.state = {
      status: null
    };
  }
  componentDidMount() {
    if (typeof window !== "undefined") {
      this.setState({
        status: localStorage.getItem("localstorage-status") ? true : false
      });

      window.addEventListener("storage", this.localStorageUpdated);
    }
  }
  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", this.localStorageUpdated);
    }
  }
  agree() {
    localStorage.setItem("localstorage-status", true);
    this.updateState(true);
  }
  disagree() {
    localStorage.setItem("localstorage-status", false);
    this.updateState(false);
  }
  localStorageUpdated() {
    if (!localStorage.getItem("localstorage-status")) {
      this.updateState(false);
    } else if (!this.state.status) {
      this.updateState(true);
    }
  }
  updateState(value) {
    this.setState({ status: value });
  }
  render() {
    return !this.state.status ? (
      <div className="alert-wrapper">
        <h3>The Good Stuff</h3>
        <p>Blah blah blah</p>
        <div className="alert-button-wrap">
          <button onClick={this.disagree}>Disagree</button>
          <button onClick={this.agree}>Agree</button>
        </div>
      </div>
    ) : null;
  }
}
export default Alert;
