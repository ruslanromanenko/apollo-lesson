import React from "react";

class SignOut extends React.Component {
  componentDidMount() {
    sessionStorage.clear();
    this.props.history.push("/sign-in");
  }

  render() {
    return <div></div>;
  }
}

export default SignOut;
