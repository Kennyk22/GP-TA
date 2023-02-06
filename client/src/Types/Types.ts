

export interface Student {
    ownerId: string,
    id: number,
    name: string
}

export interface Assignment {
    id: number,
    ownerId: string,
    title: string
}

export interface GPTAstate {
    type: string,
    file: string,
    highlightResult: string,
    listResult: string[],
    suggestionResult: string[],
    input: string,
    loading: boolean,
    allStudents: Student[]
    select: {
        titleId: number | null,
        studentId: number | null
    }
    allAssignments: Assignment[]
    selectedStudent: string | boolean
    selectedTitle: string | boolean
    image: string
    imgURL: string
}


export interface WholeState {
    GPTA: GPTAstate
}