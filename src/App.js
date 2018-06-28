import React, { Component } from "react";
import ViewContainer from "./containers/ViewContainer";
import TabContainer from "./containers/TabContainer";
import "./App.css";
import { Layout } from "antd";
const { Footer, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <TabContainer />
        <Content>
          <ViewContainer />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default App;
