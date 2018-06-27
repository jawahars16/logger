import React, { Component } from 'react';
import brace from 'brace';
import io from 'socket.io-client';
import Viewer from '../components/Viewer';
import { read } from '../common/util';
import * as actions from '../actions';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
const { ipcRenderer } = window.require('electron');

class ViewContainer extends Component {

    session;
    socket;

    constructor(props) {
        super(props);
        this.handleSessionCallback = this.handleSessionCallback.bind(this);
        ipcRenderer.on('open-file', function (file) {
            alert('open file');
            console.log('open file');
            actions.openFile(file);
        });
        debugger;
    }

    handleSessionCallback(session) {
        this.session = session;
        this.socket = io('http://localhost:3001');
        this.socket.emit('read', this.props.sessions[0].filePath);
        this.startStreaming();
    }

    startStreaming() {
        this.socket.on('connect', () => {
            this.socket.on('line', (line) => {
                this.appendText(line);
            });
        });
    }

    appendText(text) {
        this.session.insert({
            row: this.session.getLength(),
            column: 0
        }, `${text}\n`)
    }

    render() {
        alert('re-render');
        if (this.props.sessions && this.props.sessions.length > 0) {
            return (
                <div>
                    <Viewer sessionCallback={this.handleSessionCallback} />
                </div>);
        } else {
            return (
                <div>
                    Select a log file
                </div>);
        }
    }
}

function mapStateToProps(state) {
    alert(JSON.stringify(state));
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