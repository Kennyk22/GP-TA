import { combineReducers } from "redux";
import { GPTAstate } from "../Types/Types";

const initGPTA = {
    type: 'text',
    file: "",
    highlightResult: "",
    listResult: [],
    suggestionResult: '',
    input: "",
    loading: false,
    allStudents: [],
    select: { titleId: null, studentId: null },
    allAssignments: [{id: 3, ownerId: 'wow', title:'hello'}],
    selectedStudent: false,
    selectedTitle: false,
    image: '',
    imgURL: ''
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
        case 'GPTA_SELECTTITLE':
            return { ...state, select: { ...state.select, titleId: action.payload } }
        case 'GPTA_MENUTITLE':
            return { ...state, selectedTitle: action.payload}
        case 'GPTA_MENUSTUDENT':
            return { ...state, selectedStudent: action.payload }
        case 'GPTA_ALLASSIGNMENTS':
            return {...state, allAssignments: action.payload}
        case 'GPTA_IMAGE':
            return {...state, image: action.payload}
        case 'GPTA_URL':
            return {...state, imgURL: action.payload}
        case 'GPTA_SUGGESTION':
            return {...state, suggestionResult: action.payload}
        default:
            return state;
    }

}



const Reducer = combineReducers({
    GPTA
})


export default Reducer