import { combineReducers } from "redux";
import { GPTAstate } from "../Types/Types";

const initGPTA = {
    type: false,
    file: "",
    highlightResult: "",
    listResult: [],
    input: "",
    loading: false,
    allStudents: [],
    select: { titleId: 1, studentId: null },
    allAssignments: []
}

const GPTA = (state: GPTAstate = initGPTA, action: {type: string, payload: any})=>{
    switch (action.type) {
        case 'GPTA_TYPE':
            return{...state, type: action.payload}
        case 'GPTA_FILE':
            return{...state, file: action.payload}
        case 'GPTA_HIGHLIGHT':
            return{...state, highlightResult: action.payload}
        case 'GPTA_LIST':
            return{...state, listResult: action.payload}
        case 'GPTA_INPUT':
            return{...state, input: action.payload}
        case 'GPTA_LOADING':
            return{...state, loading: action.payload}
        case 'GPTA_ALLSTUDENTS':
            return{...state, allStudents: action.payload}
        case 'GPTA_SELECTSTUDENT':
            return { ...state, select: { ...state.select, studentId: action.payload } }
        case 'GPTA_ALLASSIGNMENTS':
            return {...state, allAssignments: action.payload}
        default:
            return state;
    }

}



const Reducer = combineReducers({
    GPTA
})


export default Reducer