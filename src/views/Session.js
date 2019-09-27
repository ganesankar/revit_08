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
import StaffItemCard from "./../components/item/staffItemCard";
import FormGroupInput from "./../components/form/formGroupInput";
import CellLinkRenderer from "./../components/grid/cellLinkRender";

import api from "./../utils/api";
import sortByDate from "./../utils/sortByDate";
import isLocalHost from "./../utils/isLocalHost";

export default class Sessions extends Component {
  state = {
    todos: [],
    context: { componentParent: this },
    session: {},
    sessionModal: false,
    sessionViewModal: false,
    showMenu: false,
    iconTabs: 1,
    textTabs: 4,
    columnDefs: [
      
      {
        headerName: "Name",
        field: "username",
        sortable: true,
        filter: "agTextColumnFilter",
        pinned: "left"
      },
      {
        headerName: "Email",
        field: "email",
        filter: "agTextColumnFilter"
      },
      {
        headerName: "googleID",
        field: "googleID",
        filter: "agTextColumnFilter"
      },
      {
        headerName: "FirstLogin",
        field: "firstlogin",
        sortable: true,
        filter: "agTextColumnFilter"
      },
      {
        headerName: "Recent Login ",
        field: "lastlogin",
        sortable: true,
        filter: "agTextColumnFilter"
      },
      {
        headerName: "Total Login ",
        field: "total",
        sortable: true,
        filter: "agTextColumnFilter"
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
    api.readAllSessions().then(replists => {
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
          itemis.id = getSessionId(item);
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
  

  saveSession = () => {
    const { sessionModelData } = this.state;
    sessionModelData.ts=  new Date().getTime() * 10000;
    

    if (sessionModelData.id) {
      api
        .updateSession(sessionModelData.id, sessionModelData)
        .then(() => {
          ToastsStore.success(`Profile Changes Updated!`);
        })
        .catch(e => {
          console.log("An API error occurred", e);
          ToastsStore.error(`Profile Update Failed!`);
        });
    } else {
      api
        .createSession(sessionModelData)
        .then(response => {
          ToastsStore.success(`Profile Created Succesfully!`);
        })
        .catch(e => {
          console.log("An API error occurred", e);
          ToastsStore.error(`Profile Creation Failed!`);
        });
    }
  };
  deleteSession = e => {
    const { replists } = this.state;
    const replistId = e.target.dataset.id;

    // Optimistically remove replist from UI
    const filteredSessions = replists.reduce(
      (acc, current) => {
        const currentId = getSessionId(current);
        if (currentId === replistId) {
          // save item being removed for rollback
          acc.rollbackSession = current;
          return acc;
        }
        // filter deleted replist out of the replists list
        acc.optimisticState = acc.optimisticState.concat(current);
        return acc;
      },
      {
        rollbackSession: {},
        optimisticState: []
      }
    );

    this.setState({
      replists: filteredSessions.optimisticState
    });

    // Make API request to delete replist
    api
      .deleteSession(replistId)
      .then(() => {
        console.log(`deleted replist id ${replistId}`);
      })
      .catch(e => {
        console.log(`There was an error removing ${replistId}`, e);
        // Add item removed back to list
        this.setState({
          replists: filteredSessions.optimisticState.concat(
            filteredSessions.rollbackSession
          )
        });
      });
  };

  onChange = e => {
    console.log("ose", e);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onInputChange = (na, val) => {
    const { sessionModelData } = this.state;
    sessionModelData[na] = val;
    this.setState({ sessionModelData });
  };
  onInputSocialChange = (na, val) => {
    const { sessionModelData } = this.state;
    sessionModelData.social[na] = val;
    this.setState({ sessionModelData });
  };
  onInputSubjectChange = (na, val) => {
    const { sessionModelData } = this.state;
    sessionModelData.subjects[na] = val;
    this.setState({ sessionModelData });
  };
  fileChangedHandler = files => {
    console.log("file", files);

    const { sessionModelData } = this.state;
    if (files.size) {
      const fileSize = files.size.replace("kB", "").trim();
      console.log("fileSize", fileSize);
      if (Number(fileSize) > 1000) {
        ToastsStore.error("Upload Image less than 1 MB");
      } else {
        sessionModelData.flagimg = files;
        this.setState({ sessionModelData });
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
  renderSessions() {
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
      const { data } = replist;
      const id = getSessionId(replist);
      // only show delete button after create API response returns
      

      return (
        <div key={i} className="col-12 col-md-6 col-sm-12 col-xl-4">
          <UserListCard
            html={data.name}
            profileData={data}
            profileRef={id}
            viewLink={true}
            editLink={true}
            openUserModal={this.openUserModal}
            editPath="/session/edit/"
            viewPath="/session/"
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
                Sessions List
                <br /> <span className="text-info"> whomever logged</span>
              </h1>
            </Col>
            
          </Row>

          <div className="row">
            {/*this.renderSessions()*/}
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

        

        
      </div>
    );
  }
}

function getSessionId(todo) {
  if (!todo.ref) {
    return null;
  }
  return todo.ref["@ref"].id;
}
