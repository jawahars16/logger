import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tabs: [],
  selectedTab: null
};

const Tab = (state = initialState, action = null) => {
  switch (action.type) {
    case actionTypes.OPEN_FILE:
      const newTab = {
        title: action.filePath.replace(/^.*[\\\/]/, ""),
        key: action.filePath
      };
      return {
        ...state,
        tabs: [...state.tabs, newTab],
        selectedTab: newTab.key
      };
    case actionTypes.SELECT_TAB:
      return {
        ...state,
        selectedTab: action.filePath
      };
    default:
      return state;
  }
};

export default Tab;
