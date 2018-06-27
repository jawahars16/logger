import * as actions from '../actions/actionTypes';

const initialState = {
    sessions: []
}

const Viewer = (state = initialState, action = null) => {
    switch (action.type) {
        case actions.OPEN_FILE:
            const session = {
                filePath: action.filePath
            };
            return {
                ...state,
                sessions: [session]
            };
        default:
            return state;
    }
}

export default Viewer;