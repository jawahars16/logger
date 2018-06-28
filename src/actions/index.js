import * as actions from './actionTypes';

export function openFile(filePath){
    return {
        type: actions.OPEN_FILE,
        filePath
    }
}

export function selectTab(filePath){
    return {
        type: actions.SELECT_TAB,
        filePath
    }
}