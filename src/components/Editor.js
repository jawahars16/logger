import React, { Component } from "react";
import ace from "brace";
import io from "socket.io-client";
import { truncate } from "fs";
const { ipcRenderer } = window.require("electron");
const monaco = require("monaco-editor");

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.updateRef = this.updateRef.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.onConnect = this.onConnect.bind(this);
    ipcRenderer.on("resize", this.updateHeight);
  }

  initialize() {
    // Register a new language
    monaco.languages.register({ id: "logLanguage" });

    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider("logLanguage", {
      tokenizer: {
        root: [
          [/\[error.*/, "error"],
          [/\[info.*/, "info"],
          [/\[notice.*/, "info"],
          [/\[warn.*/, "warn"],
          [/\GET|POST|PUT|DELETE|HEAD/, "http"],
          [/\/[a-z]*/, "url"],
          [/\[[a-zA-Z 0-9:]+\]/, "date-time"],
          [
            /\Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Tues|Thur|Thurs|Sun|Mon|Tue|Wed|Thu|Fri|Sat/,
            "date-time"
          ],
          [
            /\Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Sept|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?/,
            "date-time"
          ],
          [/[0-9]+/, "date-time"]
        ]
      }
    });

    // Define a new theme that constains only rules that match this language
    monaco.editor.defineTheme("logTheme", {
      base: "vs",
      inherit: false,
      rules: [
        { token: "info", foreground: "808080" },
        { token: "error", foreground: "ff0008", fontStyle: "bold" },
        { token: "warn", foreground: "ffae00" },
        { token: "date-time", foreground: "008800" },
        { token: "http", foreground: "0099ff" },
        { token: "url", foreground: "00a9ff" }
      ]
    });
  }

  updateRef(element) {
    this.container = element;
  }

  componentDidMount() {
    this.initialize();
    this.editor = monaco.editor.create(this.container, {
      scrollBeyondLastLine: false,
      theme: "logTheme",
      language: "logLanguage"
    });
    this.startStreaming();
    this.showFind();
  }

  showFind() {
    this.editor.getAction("actions.find").run();
    setTimeout(function () {
      const toggleButton = document.getElementsByClassName("button toggle left collapse");
      const replacePart = document.getElementsByClassName("replace-part");
      toggleButton[0].style.display = replacePart[0].style.display =
        "none";
    }, 100);
  }

  updateHeight(height) {
    this.setState({ refresh: true });
    this.editor.layout();
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
    this.socket.on("connect", this.onConnect);
  }

  onConnect() {
    const editor = this.editor;
    const socket = this.socket;
    const filePath = this.props.filePath;
    this.socket.on("write", function(res) {
      const model = monaco.editor.createModel(res, "logLanguage");
      editor.setModel(model);
      editor.revealLine(model.getLineCount());
      socket.emit("stream", filePath);
    });
    this.socket.on("line", line => {
      this.appendText(line);
    });
    this.socket.emit("read", this.props.filePath);
  }

  appendText(text) {
    const lineCount = this.editor.getModel().getLineCount();
    const lastLineLength = this.editor.getModel().getLineMaxColumn(lineCount);

    const range = new monaco.Range(
      lineCount,
      lastLineLength,
      lineCount,
      lastLineLength
    );

    this.editor.executeEdits("", [{ range: range, text: text + "\n" }]);
    this.editor.revealLine(this.editor.getModel().getLineCount());
  }

  render() {
    const style = {
      fontSize: "14px !important",
      border: "1px solid lightgray",
      height: window.outerHeight - 90
    };
    return <div ref={this.updateRef} style={style} />;
  }
}

export default Editor;
