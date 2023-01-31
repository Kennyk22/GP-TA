


export interface GPTAstate {
    type: boolean,
    file: string,
    highlightResult: string,
    listResult: JSX.Element[],
    input: string,
    loading: boolean,
    allStudents: string[]
}

export interface WholeState {
    GPTA: GPTAstate
}