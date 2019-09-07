import React, { Component } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import FileBase64 from "react-file-base64";
import { ToastsContainer, ToastsStore } from "react-toasts";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
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
import StaffItemCard from "./../components/item/staffItemCard";
import FormGroupInput from "./../components/form/formGroupInput";
import CellLinkRenderer from "./../components/grid/cellLinkRender";

import api from "./../utils/api";
import sortByDate from "./../utils/sortByDate";
import isLocalHost from "./../utils/isLocalHost";

const userbase = {
  roll: 0,
  spr: 0,
  designation: "",
  verified: true,
  name: "",
  email: "",
  othername: "",
  dob: "",
  anniversary: "",
  married: false,
  native: "",
  location: "",
  work: "",
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    blogger: "",
    skype: "",
    whatsapp: "",
    github: "",
    google: "",
    medium: "",
    microsoft: "",
    pinterest: "",
    quora: "",
    youtube: ""
  },
  subjects: {
    s1: "",
    s2: "",
    s3: "",
    s4: "",
    s5: "",
    s6: "",
    s7: "",
    s8: ""
  },
  url: "",
  flagimg: ""
};
export default class Staffs extends Component {
  state = {
    todos: [],
    context: { componentParent: this },
    staff: {},
    staffModelData: { ...userbase },
    staffModal: false,
    staffViewModal: false,
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
    api.readAllStaffs().then(replists => {
      if (replists.message === "unauthorized") {
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
      if(replists.length > 0){
        replists.forEach(function(item, index) {
          let itemis = item.data;
          itemis.act = index;
          itemis.id = getStaffId(item);
          optimisedData.push(itemis);
        });
        this.setState({
          replists: replists,
          gridData: optimisedData
        });
      }else{
        this.setState({
          replists: [],
          gridData: []
        });
      }
      
    });
  }
  toggle = () => {
    const { staffModal } = this.state;
    this.setState({
      staffModal: !staffModal
    });
  };

  saveStaff = () => {
    const { staffModelData } = this.state;

    const newStaffArray = [
      {
        data: staffModelData,
        ts: new Date().getTime() * 10000
      }
    ];

    if (staffModelData.id) {
      api
        .updateStaff(staffModelData.id, staffModelData)
        .then(() => {
          ToastsStore.success(`Profile Changes Updated!`);
        })
        .catch(e => {
          console.log("An API error occurred", e);
          ToastsStore.error(`Profile Update Failed!`);
        });
    } else {
      api
        .createStaff(staffModelData)
        .then(response => {
          ToastsStore.success(`Profile Created Succesfully!`);
        })
        .catch(e => {
          console.log("An API error occurred", e);
          ToastsStore.error(`Profile Creation Failed!`);
        });
    }
  };
  deleteStaff = e => {
    const { replists } = this.state;
    const replistId = e.target.dataset.id;

    // Optimistically remove replist from UI
    const filteredStaffs = replists.reduce(
      (acc, current) => {
        const currentId = getStaffId(current);
        if (currentId === replistId) {
          // save item being removed for rollback
          acc.rollbackStaff = current;
          return acc;
        }
        // filter deleted replist out of the replists list
        acc.optimisticState = acc.optimisticState.concat(current);
        return acc;
      },
      {
        rollbackStaff: {},
        optimisticState: []
      }
    );

    this.setState({
      replists: filteredStaffs.optimisticState
    });

    // Make API request to delete replist
    api
      .deleteStaff(replistId)
      .then(() => {
        console.log(`deleted replist id ${replistId}`);
      })
      .catch(e => {
        console.log(`There was an error removing ${replistId}`, e);
        // Add item removed back to list
        this.setState({
          replists: filteredStaffs.optimisticState.concat(
            filteredStaffs.rollbackStaff
          )
        });
      });
  };

  newStaffModal = () => {
    const staffItem = { ...userbase };

    this.setState({
      staffModal: true,
      staffModelData: staffItem
    });
  };
  openUserModal = id => {
    
    console.log('openUserModal' , id);
    const staffItem = this.state.gridData.find(o => o.id === id);
    if (Object.keys(staffItem.social).length === 0) {
      staffItem.social = { ...userbase.social };
    }
    console.log(staffItem);
    this.setState({
      staffModal: true,
      staffModelData: staffItem
    });
  };
  openUserView = id => {
    console.log('openUserView' , id);
    const { staffViewModal } = this.state;
    const staffItem = this.state.gridData.find(o => o.id === id);
    this.setState({
      staffViewModal: !staffViewModal,
      staffModelData: staffItem
    });
  };
  toogleStaffView = () => {
    const { staffViewModal } = this.state;
    this.setState({
      staffViewModal: !staffViewModal
    });
  };

  onChange = e => {
    console.log("ose", e);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onInputChange = (na, val) => {
    const { staffModelData } = this.state;
    staffModelData[na] = val;
    this.setState({ staffModelData });
  };
  onInputSocialChange = (na, val) => {
    const { staffModelData } = this.state;
    staffModelData.social[na] = val;
    this.setState({ staffModelData });
  };
  onInputSubjectChange = (na, val) => {
    const { staffModelData } = this.state;
    staffModelData.subjects[na] = val;
    this.setState({ staffModelData });
  };
  fileChangedHandler = files => {
    console.log("file", files);

    const { staffModelData } = this.state;
    if (files.size) {
      const fileSize = files.size.replace("kB", "").trim();
      console.log("fileSize", fileSize);
      if (Number(fileSize) > 1000) {
        ToastsStore.error("Upload Image less than 1 MB");
      } else {
        staffModelData.flagimg = files;
        this.setState({ staffModelData });
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
  renderStaffs() {
    const { replists } = this.state;

    if (!replists || !replists.length) {
      // Loading State here
      return null;
    }

    const timeStampKey = "ts";
    const orderBy = "desc"; // or `asc`
    const sortOrder = sortByDate(timeStampKey, orderBy);
    const replistsByDate = replists.sort(sortOrder);

    return replistsByDate.map((replist, i) => {
      const { data, ref } = replist;
      const id = getStaffId(replist);
      // only show delete button after create API response returns
      let deleteButton;
      if (ref) {
        deleteButton = (
          <button data-id={id} onClick={this.deleteStaff}>
            delete
          </button>
        );
      }

      return (
        <div key={i} className="col-12 col-md-6 col-sm-12 col-xl-4">
          <UserListCard
            html={data.name}
            profileData={data}
            profileRef={id}
            viewLink={true}
            editLink={true}
            openUserModal={this.openUserModal}
            editPath="/staff/edit/"
            viewPath="/staff/"
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
              <h1>
                Staffs List
                <br /> <span className="text-info"> across departments</span>
              </h1>
            </Col>
            <Col md="4"></Col>
            <Col md="4">
              <div className="text-right pt-5">
                <Button color="danger" onClick={this.newStaffModal}>
                  NEW
                </Button>
                <Button color="danger" onClick={this.download}>
                  Download
                </Button>
              </div>
            </Col>
          </Row>

          <div className="row">
            {/*this.renderStaffs()*/}
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
            </Card>
          </div>
        </div>

        <Modal
          isOpen={this.state.staffModal}
          toggle={this.toggle}
          className="modal-xl"
        >
          <ModalHeader toggle={this.toggle}>
            <hr className="line-info" />
            <h3>
              Staffs Edit{" "}
              <span className="text-info">
                {" "}
                {this.state.staffModelData.name}{" "}
              </span>
            </h3>
          </ModalHeader>
          <ModalBody>
            <form
              className="todo-create-wrapper"
              onSubmit={e => {
                e.preventDefault();
                this.saveStaff();
              }}
            >
              <Container fluid>
                <Row>
                  <Col md="9">
                    <Nav className="nav-tabs-info" role="tablist" tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.textTabs === 4
                          })}
                          onClick={e => this.toggleTabs(e, "textTabs", 4)}
                        >
                          Profile
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.textTabs === 5
                          })}
                          onClick={e => this.toggleTabs(e, "textTabs", 5)}
                        >
                          Social
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.textTabs === 6
                          })}
                          onClick={e => this.toggleTabs(e, "textTabs", 6)}
                        >
                          Subjects taken
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent
                      className="tab-space"
                      activeTab={"link" + this.state.textTabs}
                    >
                      <TabPane tabId="link4">
                        <Container fluid>
                       
                          <Row>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={this.state.staffModelData.name}
                                label="Name"
                                name="name"
                                onInputChange={this.onInputChange}
                              />
                            </Col>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.othername
                                }
                                label="Nick Name"
                                name="othername"
                                onInputChange={this.onInputChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={this.state.staffModelData.email}
                                label="E Mail"
                                name="email"
                                onInputChange={this.onInputChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={this.state.staffModelData.work}
                                label="Work"
                                name="work"
                                onInputChange={this.onInputChange}
                              />
                            </Col>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.designation
                                }
                                label="Designation"
                                name="designation"
                                onInputChange={this.onInputChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={this.state.staffModelData.dob}
                                label="Date of Birth"
                                name="dob"
                                type="date"
                                onInputChange={this.onInputChange}
                              />
                            </Col>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.anniversary
                                }
                                label="Anniversary"
                                name="anniversary"
                                type="date"
                                onInputChange={this.onInputChange}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={this.state.staffModelData.native}
                                label="Native"
                                name="native"
                                onInputChange={this.onInputChange}
                              />
                            </Col>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={this.state.staffModelData.location}
                                label="Current Location"
                                name="location"
                                onInputChange={this.onInputChange}
                              />
                            </Col>
                          </Row>
                        </Container>
                      </TabPane>
                      <TabPane tabId="link5">
                        <Container fluid>
                          <Row>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.social.facebook
                                }
                                label="Facebook"
                                name="facebook"
                                onInputChange={this.onInputSocialChange}
                              />
                            </Col>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.social.instagram
                                }
                                label="instagram"
                                name="instagram"
                                onInputChange={this.onInputSocialChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.social.twitter
                                }
                                label="twitter"
                                name="twitter"
                                onInputChange={this.onInputSocialChange}
                              />
                            </Col>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.social.blogger
                                }
                                label="Blog/ Website"
                                name="blogger"
                                onInputChange={this.onInputSocialChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.social.skype
                                }
                                label="skype"
                                name="skype"
                                onInputChange={this.onInputSocialChange}
                              />
                            </Col>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.social.whatsapp
                                }
                                label="whatsapp"
                                name="whatsapp"
                                onInputChange={this.onInputSocialChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.social.github
                                }
                                label="github"
                                name="github"
                                onInputChange={this.onInputSocialChange}
                              />
                            </Col>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.social.google
                                }
                                label="google"
                                name="google"
                                onInputChange={this.onInputSocialChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.social.medium
                                }
                                label="medium"
                                name="medium"
                                onInputChange={this.onInputSocialChange}
                              />
                            </Col>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.social.microsoft
                                }
                                label="microsoft"
                                name="microsoft"
                                onInputChange={this.onInputSocialChange}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.social.pinterest
                                }
                                label="pinterest"
                                name="pinterest"
                                onInputChange={this.onInputSocialChange}
                              />
                            </Col>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.social.quora
                                }
                                label="quora"
                                name="quora"
                                onInputChange={this.onInputSocialChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.social.linkedin
                                }
                                label="linkedin"
                                name="linkedin"
                                onInputChange={this.onInputSocialChange}
                              />
                            </Col>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.social.youtube
                                }
                                label="youtube"
                                name="youtube"
                                onInputChange={this.onInputSocialChange}
                              />
                            </Col>
                          </Row>
                        </Container>
                      </TabPane>
                      <TabPane tabId="link6">
                        <Container fluid>
                          <Row>
                            <Col md="6">
                              <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.subjects.s1
                                }
                                label="Semester 1"
                                name="s1"
                                onInputChange={this.onInputSubjectChange}
                              />
                            </Col>
                            <Col md="6">
                            <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.subjects.s2
                                }
                                label="Semester 2"
                                name="s2"
                                onInputChange={this.onInputSubjectChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                            <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.subjects.s3
                                }
                                label="Semester 3"
                                name="s3"
                                onInputChange={this.onInputSubjectChange}
                              />
                            </Col>
                            <Col md="6">
                            <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.subjects.s4
                                }
                                label="Semester 4"
                                name="s4"
                                onInputChange={this.onInputSubjectChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                            <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.subjects.s5
                                }
                                label="Semester 5"
                                name="s5"
                                onInputChange={this.onInputSubjectChange}
                              />
                            </Col>
                            <Col md="6">
                            <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.subjects.s6
                                }
                                label="Semester 6"
                                name="s6"
                                onInputChange={this.onInputSubjectChange}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                            <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.subjects.s7
                                }
                                label="Semester 7"
                                name="s7"
                                onInputChange={this.onInputSubjectChange}
                              />
                            </Col>
                            <Col md="6">
                            <FormGroupInput
                                nameValue={
                                  this.state.staffModelData.subjects.s8
                                }
                                label="Semester 8"
                                name="s8"
                                onInputChange={this.onInputSubjectChange}
                              />
                            </Col>
                          </Row>
                          
                        </Container>
                      </TabPane>
                    </TabContent>
                  </Col>{" "}
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
                        {this.state.staffModelData.flagimg &&
                          this.state.staffModelData.flagimg.base64 && (
                            <img
                              src={`${this.state.staffModelData.flagimg.base64}`}
                            />
                          )}
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
          isOpen={this.state.staffViewModal}
          toggle={this.toogleStaffView}
          className="modal-xl"
        >
          <ModalHeader toggle={this.toogleStaffView}>
            <hr className="line-info" />
            <h3>
              <span className="text-info">
                {" "}
                {this.state.staffModelData.name}{" "}
              </span>
            </h3>
          </ModalHeader>
          <ModalBody>
            <StaffItemCard staff={this.state.staffModelData} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function getStaffId(todo) {
  if (!todo.ref) {
    return null;
  }
  return todo.ref["@ref"].id;
}
