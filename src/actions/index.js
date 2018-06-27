import * as actions from './actionTypes';

export function openFile(filePath){
    return {
        type: actions.OPEN_FILE,
        filePath
    }
}