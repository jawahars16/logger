import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

class Viewer extends Component {
  componentDidMount() {
    const session = this.refs.editor.editor.session;
    this.props.sessionCallback(session);
  }

  render() {
    return (
      <div>
        <AceEditor
          name="viewer"
          readOnly
          ref="editor"
          width="100%"
          height="100%"
          style={{ position: 'absolute' }}
          editorProps={
          {
              // $blockScrolling: true
          }
          }
        />
      </div>
    );
  }
}

export default Viewer;
