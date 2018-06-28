import React, { Component } from "react";
import brace from "brace";
import io from "socket.io-client";
import Editor from "../components/Editor";
import { read } from "../common/util";
import * as actions from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class ViewContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.filePath != null) {
      return <Editor filePath={this.props.filePath} />;
    } else {
      return <div>Select a log file</div>;
    }
  }
}

function mapStateToProps(state) {
  return state.View;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewContainer);
