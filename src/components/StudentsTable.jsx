import React, { Component } from "react";
import { connect } from "react-redux";

class StudentsTable extends Component {
    handleInputSearch = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: "SEARCH_STUDENT",
            studentId: event.target.value,
        });
    };

    renderStudentsData = () => {
        let { searchStudent, studentList } = this.props.initialState;
        let students = [];
        if (searchStudent.keyword === "") {
            students = [...studentList];
        } else {
            students = [...searchStudent.filterStudent];
        }
        return students.map((student) => {
            let { id, studentId, studentName, phone, email } = student;
            return (
                <tr key={id}>
                    <td>{studentId}</td>
                    <td>{studentName}</td>
                    <td>{phone}</td>
                    <td>{email}</td>
                    <td>
                        <button
                            onClick={() => {
                                this.props.dispatch({
                                    type: "VIEW_STUDENT",
                                    studentDetail: student,
                                });
                            }}
                            className="btn btn-info mr-2"
                        >
                            View
                        </button>
                        <button
                            onClick={() => {
                                this.props.dispatch({
                                    type: "DELETE_STUDENT",
                                    studentId: studentId,
                                });
                            }}
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
    };

    render() {
        return (
            <div>
                <div className="col-4 pl-0">
                    <input
                        onChange={(event) => {
                            this.handleInputSearch(event);
                        }}
                        name="search"
                        placeholder="Search"
                        type="text"
                        className="form-control my-3"
                    />
                </div>

                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Student ID</th>
                            <th>Studen Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderStudentsData()}</tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (rootReducer) => ({
    initialState: rootReducer.studentManagementReducer,
});

export default connect(mapStateToProps)(StudentsTable);
