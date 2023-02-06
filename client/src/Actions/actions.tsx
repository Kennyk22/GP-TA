import {Student, Assignment} from "../Types/Types"

export const actionInputFile = {type: 'GPTA_TYPE', payload: 'file'}

export const actionInputText = { type: 'GPTA_TYPE', payload: 'text' }

export const actionInputImage = {type: 'GPTA_TYPE', payload: 'image'}

export const actionFile = (file:string) => {
    return {type: 'GPTA_FILE', payload:file}
}
export const actionImage = (image: string) => {
    return {type: 'GPTA_IMAGE', payload:image}
}
export const actionHighlight = (result:string) => {
    return {type: 'GPTA_HIGHLIGHT', payload:result}
}
export const actionList = (result:string[]) => {
    return {type: 'GPTA_LIST', payload:result}
}
export const actionInput = (input:string) => {
    return {type: 'GPTA_INPUT', payload:input}
}
export const actionLoading = (loading:boolean) => {
    return {type: 'GPTA_LOADING', payload:loading}
}
export const actionAllStudents = (students: Student[]) => {
    return {type: 'GPTA_ALLSTUDENTS', payload:students}
}
export const actionStudentSelect = (id: number) => {
    return {type: 'GPTA_SELECTSTUDENT', payload: id}
}
export const actionTitleSelect = (id: number) => {
    return {type: 'GPTA_SELECTTITLE', payload: id}
}
export const actionAllAssignments = (assignments: Assignment[]) => {
    return {type: 'GPTA_ALLASSIGNMENTS', payload: assignments}
}
export const actionMenuTitle = (title: string) => {
    return {type: 'GPTA_MENUTITLE', payload: title}
}
export const actionMenuStudent = (student: string) => {
    return {type: 'GPTA_MENUSTUDENT', payload: student}
}
export const actionImgUrl = (url: string) => {
    return {type: 'GPTA_URL', payload: url}
}
export const actionSuggestion = (text:string[]) => {
    return {type:'GPTA_SUGGESTION', payload:text}
}


