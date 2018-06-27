import * as actions from './actionTypes';

export function openFile(filePath){
    debugger;
    return {
        type: actions.OPEN_FILE,
        filePath
    }
}