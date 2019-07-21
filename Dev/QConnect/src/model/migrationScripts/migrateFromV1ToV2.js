export default function migrateFromV1ToV2(state) {
    const oldState = state.data;
    const newState = {
        ...oldState,
        student: {
            id: "",
            name: "",
            imageId: 1,
            averageRating: 1,
            totalAssignments: 1,
            isReady: false,
            currentAssignment: '',
            assignmentHistory: [],
            currentClassID: "",
            classes: []
        },
    }
    return { data: newState };
}