import React, { Component } from "react";
import brace from "brace";
import io from "socket.io-client";
import Viewer from "../components/Viewer";
import { read } from "../common/util";
import * as actions from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
const { ipcRenderer } = window.require("electron");

class ViewContainer extends Component {
  session = null;

  constructor(props) {
    super(props);
    this.handleSessionCallback = this.handleSessionCallback.bind(this);
    this.handleOpenFile = this.handleOpenFile.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on("open-file", this.handleOpenFile);
  }

  handleOpenFile(event, file) {
    this.props.actions.openFile(file);
  }

  handleSessionCallback(session) {
    this.session = session;
    const socket = io("http://localhost:3001");
    this.startStreaming(socket);
  }

  startStreaming(socket) {
    socket.on("connect", () => {
      socket.emit("read", this.props.sessions[0].filePath);
    });
    socket.on("line", line => {
      this.appendText(line);
    });
  }

  appendText(text) {
    this.session.insert(
      {
        row: this.session.getLength(),
        column: 0
      },
      `${text}\n`
    );
  }

  render() {
    if (this.props.sessions && this.props.sessions.length > 0) {
      return (
        <div>
          <Viewer sessionCallback={this.handleSessionCallback} />
        </div>
      );
    } else {
      return <div>Select a log file</div>;
    }
  }
}

function mapStateToProps(state) {
  return state.Viewer;
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
