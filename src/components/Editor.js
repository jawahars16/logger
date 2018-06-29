import React, { Component } from "react";
import ace from "brace";
import io from "socket.io-client";
const { ipcRenderer } = window.require("electron");

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.updateRef = this.updateRef.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    ipcRenderer.on("resize", this.updateHeight);
  }

  updateRef(element) {
    this.container = element;
  }

  componentDidMount() {
    this.editor = ace.edit(this.container);
    this.editor.setTheme("ace/theme/clouds");
    this.editor.setShowPrintMargin(false);
    this.editor.container.style.lineHeight = '15px';
    this.updateHeight();
    this.startStreaming();
  }

  updateHeight(height) {
    this.editor.setOptions({ maxLines: ((window.outerHeight - 85) / 15)});
    this.editor.resize();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.filePath === null ||
      this.props.filePath === nextProps.filePath
    ) {
      return;
    }

    this.startStreaming();
  }

  startStreaming() {
    if (this.socket != null) {
      this.socket.disconnect();
      this.socket.destroy();
    }

    this.editor.setValue("");
    this.socket = io("http://localhost:3001");
    this.socket.on("connect", () => {
      this.socket.emit("read", this.props.filePath);
    });
    this.socket.on("line", line => {
      this.appendText(line);
    });
  }

  appendText(text) {
    this.editor.session.insert(
      {
        row: this.editor.session.getLength(),
        column: 0
      },
      `${text}\n`
    );
  }

  render() {
    const style = {
      fontSize: "14px !important",
      border: "1px solid lightgray"
    };
    return <div ref={this.updateRef} style={style} />;
  }
}

export default Editor;
