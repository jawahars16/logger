import React, { Component } from "react";
import TabStrip from "../components/TabStrip";
import * as actions from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Layout } from "antd";
const { Header } = Layout;

class TabContainer extends Component {
  constructor(props) {
    super(props);
    this.onTabSelected = this.onTabSelected.bind(this);
  }

  onTabSelected(key) {
    this.props.actions.selectTab(key);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedTab != null &&
      nextProps.selectedTab != this.props.selectedTab
    ) {
      this.onTabSelected(nextProps.selectedTab);
    }
  }

  render() {
    if (this.props.tabs.length === 0) {
      return null;
    }

    return (
      <Header >
        <TabStrip
          tabs={this.props.tabs}
          handleOnChange={this.onTabSelected}
          selectedTab={this.props.selectedTab}
        />
      </Header>
    );
  }
}

function mapStateToProps(state) {
  return state.Tab;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabContainer);
