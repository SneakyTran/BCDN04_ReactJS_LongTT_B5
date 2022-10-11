import { isCursorAtEnd } from "@testing-library/user-event/dist/utils";
import React, { Component } from "react";
import { connect } from "react-redux";

class StudentForm extends Component {
    state = {
        values: {
            id: "",
            studentId: "",
            studentName: "",
            phone: "",
            email: "",
        },
        errors: {
            studentId: "",
            studentName: "",
            phone: "",
            email: "",
        },
    };

    handleInputChange = (event) => {
        let { value, name } = event.target;
        let errorMsg = "";
        //check empty
        let newValues = { ...this.state.values, [name]: value };
        let newErrors = { ...this.state.errors };
        if (value.trim() === "") {
            let nameErr = "";
            switch (name) {
                case "studentId":
                    nameErr = "Student ID";
                    break;

                case "studentName":
                    nameErr = "Student Name";
                    break;

                default:
                    nameErr = name;
                    break;
            }
            errorMsg = nameErr + " must be not empty";
        }
        newErrors[name] = errorMsg;

        //validation phone
        if (name === "phone") {
            let regex = /^[0-9]+$/;
            if (!value.match(regex)) {
                errorMsg = "Phone must be contain only number";
            }
            newErrors[name] = errorMsg;
        }

        //validation email
        if (event.target.getAttribute("validation") === "email") {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!value.match(regex)) {
                errorMsg = "Email is not valid!";
            }
            newErrors[name] = errorMsg;
        }

        this.setState({
            values: newValues,
            errors: newErrors,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let isValid = true;
        //check errors are existed?
        for (const key in this.state.errors) {
            if (this.state.errors[key] !== "") {
                isValid = false;
                break;
            }
        }
        //check empty input
        for (const key in this.state.values) {
            if (key !== "id") {
                if (this.state.values[key] === "") {
                    isValid = false;
                    break;
                }
            }
        }

        if (!isValid) {
            return;
        }

        //check isExisted studentId
        let idFound = this.props.initialState.studentList.findIndex(
            (stu) => stu.studentId === this.state.values.studentId
        );
        if (idFound > -1) {
            alert("Student ID is existed!");
            return;
        }

        this.props.dispatch({
            type: "ADD_STUDENT",
            newStudent: this.state.values,
        });
    };

    handleUpdate = (event) => {
        event.preventDefault();
        let isValid = true;
        //check errors are existed?
        for (const key in this.state.errors) {
            if (this.state.errors[key] !== "") {
                isValid = false;
                break;
            }
        }
        //check empty input
        for (const key in this.state.values) {
            if (key !== "id") {
                if (this.state.values[key] === "") {
                    isValid = false;
                    break;
                }
            }
        }

        if (!isValid) {
            return;
        }

        //check isExisted studentId
        let indexFound = this.props.initialState.studentList.findIndex(
            (stu) => stu.studentId === this.state.values.studentId
        );
        if (indexFound === -1) {
            alert("Student ID is not exist!");
            return;
        }
        this.props.dispatch({
            type: "UPDATE_STUDENT",
            indexFound: indexFound,
            updateStudent: this.state.values,
        });
    };

    static getDerivedStateFromProps(newProps, curentState) {
        if (newProps.initialState.studentDetail.id !== curentState.values.id) {
            return {
                ...curentState,
                values: newProps.initialState.studentDetail,
            };
        }
        return curentState;
    }

    render() {
        let { values, errors } = this.state;
        return (
            <div>
                <h3 className="p-3 text-white bg-dark">Student Information</h3>
                <form
                    onSubmit={(event) => {
                        this.handleSubmit(event);
                    }}
                >
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Student ID</label>
                                <input
                                    onChange={(e) => {
                                        this.handleInputChange(e);
                                    }}
                                    placeholder="Student ID"
                                    value={values.studentId}
                                    name="studentId"
                                    type="text"
                                    className="form-control"
                                />
                                <span className="text-danger" name="studentId">
                                    {errors.studentId}
                                </span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Student Name</label>
                                <input
                                    onChange={(e) => {
                                        this.handleInputChange(e);
                                    }}
                                    placeholder="Student Name"
                                    value={values.studentName}
                                    name="studentName"
                                    type="text"
                                    className="form-control"
                                />
                                <span
                                    className="text-danger"
                                    name="studentName"
                                >
                                    {errors.studentName}
                                </span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    onChange={(e) => {
                                        this.handleInputChange(e);
                                    }}
                                    placeholder="Phone"
                                    value={values.phone}
                                    name="phone"
                                    type="text"
                                    className="form-control"
                                />
                                <span className="text-danger" name="phone">
                                    {errors.phone}
                                </span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    onChange={(e) => {
                                        this.handleInputChange(e);
                                    }}
                                    placeholder="Email"
                                    value={values.email}
                                    validation="email"
                                    name="email"
                                    type="text"
                                    className="form-control"
                                />
                                <span className="text-danger" name="email">
                                    {errors.email}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-success mr-2">
                        Add New Student
                    </button>
                    <button
                        onClick={(event) => {
                            this.handleUpdate(event);
                        }}
                        type="button"
                        className="btn btn-info"
                    >
                        Update Student
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (rootReducer) => ({
    initialState: rootReducer.studentManagementReducer,
});

export default connect(mapStateToProps)(StudentForm);
