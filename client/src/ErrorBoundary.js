import React from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.debug(errorInfo);
    console.error(error);
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
