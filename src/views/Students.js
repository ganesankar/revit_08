import React, { Component } from "react";
import classnames from "classnames";
import FileBase64 from "react-file-base64";
import { ToastsContainer, ToastsStore } from "react-toasts";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import UserListCard from "./../components/list/userListCard";
import UserItemCard from "./../components/item/userItemCard";
import FormGroupInput from "./../components/form/formGroupInput";
import CellLinkRenderer from "./../components/grid/cellLinkRender";

import api from "./../utils/api";
import sortByDate from "./../utils/sortByDate";
import isLocalHost from "./../utils/isLocalHost";

export default class Students extends Component {
  state = {
    todos: [],
    cardview: true,
    context: { componentParent: this },
    student: {},
    studentModal: false,
    studentViewModal: false,
    showMenu: false,
    iconTabs: 1,
    textTabs: 4,
    columnDefs: [
      {
        headerName: "Edit",
        field: "action",
        sortable: false,
        filter: false,
        cellRenderer: "CellLinkRenderer",
        width: 60,
        pinned: "left"
      },
      {
        headerName: "Name",
        field: "name",
        sortable: true,
        filter: "agTextColumnFilter",
        cellRenderer: "CellLinkRenderer",
        pinned: "left"
      },
      {
        headerName: "SPR No",
        field: "spr",
        width: 110,
        filter: "agNumberColumnFilter"
      },
      {
        headerName: "Nick Name",
        field: "othername",
        filter: "agTextColumnFilter"
      },
      {
        headerName: "Current Location",
        field: "location",
        sortable: true,
        filter: "agTextColumnFilter"
      },
      {
        headerName: "Native ",
        field: "native",
        sortable: true,
        filter: "agTextColumnFilter"
      },
      {
        headerName: "DOB ",
        field: "dob",
        sortable: true
      }
    ],
    getRowHeight: function(params) {
      return 40;
    },
    defaultColDef: {
      sortable: true,
      filter: true
    },
    frameworkComponents: {
      CellLinkRenderer
    }
  };
  componentDidMount() {
    // Fetch all todos
    api.readAllStudents().then(users => {
      console.log("users", users);
      if (users.message === "unauthorized") {
        if (isLocalHost()) {
          alert(
            "FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info"
          );
        } else {
          alert(
            "FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct"
          );
        }
        return false;
      }
      const optimisedData = [];
      if (users.length > 0) {
        console.log("users", users);
        users.forEach(function(item, index) {
          let itemis = item.data;
          itemis.act = index;
          itemis.id = getStudentId(item);
          optimisedData.push(itemis);
        });
        const content = optimisedData.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        this.setState({
          users: content,
          gridData: optimisedData
        });
      } else {
        this.setState({
          users: [],
          gridData: []
        });
      }
    });
  }
  toggle = () => {
    const { studentModal } = this.state;
    this.setState({
      studentModal: !studentModal
    });
  };

  saveStudent = () => {
    const { studentModelData } = this.state;
    studentModelData.ts = new Date().getTime() * 10000;

    if (studentModelData.id) {
      api
        .updateStudent(studentModelData.id, studentModelData)
        .then(() => {
          ToastsStore.success(`Profile Changes Updated!`);
        })
        .catch(e => {
          console.log("An API error occurred", e);
          ToastsStore.error(`Profile Update Failed!`);
        });
    } else {
      api
        .createStudent(studentModelData)
        .then(response => {
          ToastsStore.success(`Profile Created Succesfully!`);
        })
        .catch(e => {
          console.log("An API error occurred", e);
          ToastsStore.error(`Profile Creation Failed!`);
        });
    }
  };
  deleteStudent = e => {
    const { users } = this.state;
    const userId = e.target.dataset.id;

    // Optimistically remove user from UI
    const filteredStudents = users.reduce(
      (acc, current) => {
        const currentId = getStudentId(current);
        if (currentId === userId) {
          // save item being removed for rollback
          acc.rollbackStudent = current;
          return acc;
        }
        // filter deleted user out of the users list
        acc.optimisticState = acc.optimisticState.concat(current);
        return acc;
      },
      {
        rollbackStudent: {},
        optimisticState: []
      }
    );

    this.setState({
      users: filteredStudents.optimisticState
    });

    // Make API request to delete user
    api
      .deleteStudent(userId)
      .then(() => {
        console.log(`deleted user id ${userId}`);
      })
      .catch(e => {
        console.log(`There was an error removing ${userId}`, e);
        // Add item removed back to list
        this.setState({
          users: filteredStudents.optimisticState.concat(
            filteredStudents.rollbackStudent
          )
        });
      });
  };

  openUserModal = id => {
    console.log("openUserModal", id);
    const studentItem = this.state.gridData.find(o => o.id === id);
    if (Object.keys(studentItem.social).length === 0) {
    }
    console.log(studentItem);
    this.setState({
      studentModal: true,
      studentModelData: studentItem
    });
  };
  openUserView = id => {
    console.log("openUserView", id);
    const { studentViewModal } = this.state;
    const studentItem = this.state.gridData.find(o => o.id === id);
    this.setState({
      studentViewModal: !studentViewModal,
      studentModelData: studentItem
    });
  };
  toogleStudentView = () => {
    const { studentViewModal } = this.state;
    this.setState({
      studentViewModal: !studentViewModal
    });
  };
  toogleGridTable = () => {
    const { cardview } = this.state;
    this.setState({
      cardview: !cardview
    });
  };

  onChange = e => {
    console.log("ose", e);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onInputChange = (na, val) => {
    const { studentModelData } = this.state;
    studentModelData[na] = val;
    this.setState({ studentModelData });
  };
  onInputSocialChange = (na, val) => {
    console.log(`SO  ${na} ${val}`);
    const { studentModelData } = this.state;
    studentModelData.social[na] = val;
    this.setState({ studentModelData });
  };

  fileChangedHandler = files => {
    console.log("file", files);

    const { studentModelData } = this.state;
    if (files.size) {
      const fileSize = files.size.replace("kB", "").trim();
      console.log("fileSize", fileSize);
      if (Number(fileSize) > 1000) {
        ToastsStore.error("Upload Image less than 1 MB");
      } else {
        studentModelData.flagimg = files;
        this.setState({ studentModelData });
        ToastsStore.success(`${files.name} updated as profile image`);
      }
    }
  };
  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };
  download = () => {
    console.log("coming soon");
  };
  renderStudents() {
    const { users } = this.state;

    if (!users || !users.length) {
      // Loading State here
      return null;
    }

    const timeStampKey = "ts";
    const orderBy = "desc"; // or `asc`
    const sortOrder = sortByDate(timeStampKey, orderBy);

    return users.map((user, i) => {
      return (
        <div key={i} className="sm-12 md-6 lg-6 col">
          <UserListCard
            user={user}
            viewLink={true}
            editLink={true}
            openUserModal={this.openUserModal}
            openUserView={this.openUserView}
            editPath="/student/edit/"
            viewPath="/student/"
          />
        </div>
      );
    });
  }
  render() {
    return (
      <div className="app">
        <ToastsContainer store={ToastsStore} />
        <div className="container">
          <Row>
            <Col md="4">
              <hr className="line-info" />
              <h1>Students List</h1>
            </Col>
            <Col md="4"></Col>
            <Col md="4">
              <div className="text-right pt-5">
                <Button
                  className="btn-simple btn-round btn btn-primary"
                  onClick={this.download}
                >
                  <i className="fa fa-download" aria-hidden="true"></i>
                </Button>
                <Button
                  className="btn-simple btn-round btn btn-primary"
                  onClick={this.toogleGridTable}
                >
                  <i className="fa fa-vcard fa-table" aria-hidden="true"></i>
                </Button>
              </div>
            </Col>
          </Row>

          {this.state.cardview ? (
            <div className="row">{this.renderStudents()}</div>
          ) : (
            <div className="row">
              <Card className="card-coin card-plain">
                <CardBody>
                  <div
                    style={{ height: "70vh", width: "100%" }}
                    className="ag-theme-balham-dark"
                  >
                    <AgGridReact
                      columnDefs={this.state.columnDefs}
                      defaultColDef={this.state.defaultColDef}
                      floatingFilter={true}
                      rowData={this.state.gridData}
                      getRowHeight={this.state.getRowHeight}
                      context={this.state.context}
                      frameworkComponents={this.state.frameworkComponents}
                    ></AgGridReact>
                  </div>
                </CardBody>
              </Card>{" "}
            </div>
          )}
        </div>

        <Modal
          isOpen={this.state.studentModal}
          toggle={this.toggle}
          className="modal-xl"
        >
          <ModalHeader toggle={this.toggle}>
            <hr className="line-info" />
            <h3>
              Students Edit{" "}
              <span className="text-info">
                {" "}
                {/*this.state.studentModelData.name */}{" "}
              </span>
            </h3>
          </ModalHeader>
          <ModalBody>
            <form
              className="todo-create-wrapper"
              onSubmit={e => {
                e.preventDefault();
                this.saveStudent();
              }}
            >
              <Container fluid>
                <Row>
                  <Col md="9"></Col>{" "}
                  <Col md="3">
                    <div className="cmsUploadimage">
                      Upload City Cover Image.
                      <FileBase64
                        multiple={false}
                        onDone={this.fileChangedHandler.bind(this)}
                      />
                    </div>
                    <Card raised>
                      <div className="cmsImageDiv">
                        {/*this.state.studentModelData.flagimg &&
                          this.state.studentModelData.flagimg.base64 && (
                            <img
                              alt="student"
                              src={`${this.state.studentModelData.flagimg.base64}`}
                            />
                          )*/}
                      </div>
                    </Card>
                  </Col>
                </Row>
                <button className="btn btn-info">Create / Update</button>
              </Container>
            </form>{" "}
          </ModalBody>
        </Modal>

        <Modal
          isOpen={this.state.studentViewModal}
          toggle={this.toogleStudentView}
          className="modal-xl"
        >
          <ModalHeader toggle={this.toogleStudentView}>
            <hr className="line-info" />
            <h3>
              <span className="text-info">
                {" "}
                {/*this.state.studentModelData.name*/}{" "}
              </span>
            </h3>
          </ModalHeader>
          <ModalBody>
            <UserItemCard student={this.state.studentModelData} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function getStudentId(todo) {
  if (!todo.ref) {
    return null;
  }
  return todo.ref["@ref"].id;
}
