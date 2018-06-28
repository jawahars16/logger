import * as actions from "../actions/actionTypes";

const initialState = {
  filePath: null
};

const View = (state = initialState, action = null) => {
  switch (action.type) {
    case actions.SELECT_TAB:
      return {
        filePath: action.filePath
      };
    default:
      return state;
  }
};

export default View;
