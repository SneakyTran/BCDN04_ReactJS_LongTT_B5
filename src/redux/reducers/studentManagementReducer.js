const initialState = {
    studentList: [
        {
            id: "1",
            studentId: "SV001",
            studentName: "Name",
            phone: "01231213",
            email: "email@gmail.com",
        },
        {
            id: "2",
            studentId: "SV002",
            studentName: "Name 2",
            phone: "012312132",
            email: "email2@gmail.com",
        },
    ],

    studentDetail: {
        id: "",
        studentId: "",
        studentName: "",
        phone: "",
        email: "",
    },
    searchStudent: {
        keyword: "",
        filterStudent: [],
    },
};

export const studentManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_STUDENT":
            let newId = state.studentList.length + 1;
            let newStudent = { ...action.newStudent, id: `${newId}` };
            state.studentList = [...state.studentList, newStudent];
            console.log(state.studentList);
            return { ...state };

        case "VIEW_STUDENT":
            state.studentDetail = action.studentDetail;
            return { ...state };

        case "UPDATE_STUDENT":
            if (action.indexFound !== -1) {
                state.studentList[action.indexFound] = action.updateStudent;
            }
            //update filterList
            let studentId = state.studentList[action.indexFound].studentId;
            let indexFound = state.searchStudent.filterStudent.findIndex(
                (stu) => stu.studentId === studentId
            );
            state.searchStudent.filterStudent[indexFound] =
                action.updateStudent;
            state.studentList = [...state.studentList];
            return { ...state };

        case "DELETE_STUDENT":
            state.studentList = state.studentList.filter(
                (student) => student.studentId !== action.studentId
            );
            //update filterList
            state.searchStudent.filterStudent =
                state.searchStudent.filterStudent.filter(
                    (stu) => stu.studentId !== action.studentId
                );
            return { ...state };

        case "SEARCH_STUDENT":
            state.searchStudent.keyword = action.studentId;
            state.searchStudent.filterStudent = state.studentList.filter(
                (stu) =>
                    stu.studentId
                        .toLowerCase()
                        .includes(action.studentId.toLowerCase())
            );
            return { ...state };

        default:
            return state;
    }
};
