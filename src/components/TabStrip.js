import React from "react";
import { Tabs } from "antd";
import "antd/dist/antd.css";
const TabPane = Tabs.TabPane;

const TabStrip = props => {
  return (
    <div>
      <Tabs
        tabPosition="top"
        size="small"
        activeKey={props.selectedTab}
        onChange={props.handleOnChange}
      >
        {props.tabs.map(tab => <TabPane tab={tab.title} key={tab.key} />)}
      </Tabs>
    </div>
  );
};

export default TabStrip;
