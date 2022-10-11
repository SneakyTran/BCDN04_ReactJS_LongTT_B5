import React, { Component } from "react";
import StudentForm from "./StudentForm";
import StudentsTable from "./StudentsTable";

export default class StudentManagement extends Component {
    render() {
        return (
            <div className="container">
                <StudentForm />
                <StudentsTable />
            </div>
        );
    }
}
