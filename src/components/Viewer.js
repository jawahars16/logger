import React, { Component } from "react";
import brace from "brace";
import AceEditor from "./Editor";
const { ipcRenderer } = window.require("electron");

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    ipcRenderer.on("resize", this.resize);
  }

  componentDidMount() {
    const session = this.refs.editor.editor.session;
    this.props.sessionCallback(session);
  }

  resize(e, height) {
    this.refs.editor.editor.resize();
  }

  render() {
    return (
      <AceEditor
        name="viewer"
        readOnly
        ref="editor"
        mode="code"
        width="auto"
        height="auto"
        showPrintMargin="false"
        editorProps={
          {
            // $blockScrolling: true
          }
        }
      />
    );
  }
}

export default Viewer;
