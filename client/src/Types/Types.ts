

export interface Student {
    ownerId: string,
    id: number,
    name: string
}

export interface GPTAstate {
    type: boolean,
    file: string,
    highlightResult: string,
    listResult: JSX.Element[],
    input: string,
    loading: boolean,
    allStudents: Student[]
}


export interface WholeState {
    GPTA: GPTAstate
}