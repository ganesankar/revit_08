import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,  Row,
  Col ,Label,
  FormGroup,
  Form,
  Input,
  FormText , Container} from 'reactstrap';
import SettingsMenu from "./../components/SettingsMenu";
import SettingsIcon from "./../components/SettingsIcon";
import UserListCard from "./../components/list/userListCard";
import UserItemCard from "./../components/item/userItemCard";
import api from "./../utils/api";
import sortByDate from "./../utils/sortByDate";
import isLocalHost from "./../utils/isLocalHost";

const userbase = {
            "roll": 0,
            "spr": 0,
            "designation": "",
            "verified": true,
            "name": "",
            "email": "",
            "othername": "",
            "dob": "",
            "anniversary": "",
            "married": false,
            "native": "",
            "location": "",
            "work": "",
            "social":{
            "facebook": "",
            "instagram": "",
            "twitter": "",
            "blogger": "",
            "skype": "",
            "whatsapp": "",
            "github": "",
            "google": "",
            "medium": "",
            "microsoft": "",
            "pinterest": "",
            "quora": "",
            "youtube": ""
        },
            "url": "",
            "flagimg": ""
        };
export default class Students extends Component {
  state = {
    todos: [],
	  student: {},
    studentModal: false,
    showMenu: false
  };
  componentDidMount() {
    // Fetch all todos
    api.readAllStudents().then(replists => {
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

      console.log("all replists", replists);
      this.setState({
        replists: replists
      });
    });
  }
  toggle = () => {
    const { studentModal } = this.state;
    this.setState({
      studentModal: !studentModal
    });
  };

  saveStudent = e => {
    e.preventDefault();
    const { replists } = this.state;
    const replistValue = this.inputElement.value;

    if (!replistValue) {
      alert("Please add Student title");
      this.inputElement.focus();
      return false;
    }

    // reset input to empty
    this.inputElement.value = "";

    const replistInfo = {
      title: replistValue,
      completed: false
    };
    // Optimistically add replist to UI
    const newStudentArray = [
      {
        data: replistInfo,
        ts: new Date().getTime() * 10000
      }
    ];

    const optimisticStudentState = newStudentArray.concat(replists);

    this.setState({
      todos: optimisticStudentState
    });
    // Make API request to create new replist
    api
      .createStudent(replistInfo)
      .then(response => {
        console.log(response);
        // remove temporaryValue from state and persist API response
        const persistedState = removeOptimisticStudent(replists).concat(
          response
        );
        // Set persisted value to state
        this.setState({
          replists: persistedState
        });
      })
      .catch(e => {
        console.log("An API error occurred", e);
        const revertedState = removeOptimisticStudent(replists);
        // Reset to original state
        this.setState({
          replists: revertedState
        });
      });
  };
  deleteStudent = e => {
    const { replists } = this.state;
    const replistId = e.target.dataset.id;

    // Optimistically remove replist from UI
    const filteredStudents = replists.reduce(
      (acc, current) => {
        const currentId = getStudentId(current);
        if (currentId === replistId) {
          // save item being removed for rollback
          acc.rollbackStudent = current;
          return acc;
        }
        // filter deleted replist out of the replists list
        acc.optimisticState = acc.optimisticState.concat(current);
        return acc;
      },
      {
        rollbackStudent: {},
        optimisticState: []
      }
    );

    this.setState({
      replists: filteredStudents.optimisticState
    });

    // Make API request to delete replist
    api
      .deleteStudent(replistId)
      .then(() => {
        console.log(`deleted replist id ${replistId}`);
      })
      .catch(e => {
        console.log(`There was an error removing ${replistId}`, e);
        // Add item removed back to list
        this.setState({
          replists: filteredStudents.optimisticState.concat(
            filteredStudents.rollbackStudent
          )
        });
      });
  };
  updateStudentTitle = (event, currentValue) => {
    let isDifferent = false;
    const replistId = event.target.dataset.key;

    const updatedStudents = this.state.replists.map((replist, i) => {
      const id = getStudentId(replist);
      if (id === replistId && replist.data.title !== currentValue) {
        replist.data.title = currentValue;
        isDifferent = true;
      }
      return replist;
    });

    // only set state if input different
    if (isDifferent) {
      this.setState(
        {
          replists: updatedStudents
        },
        () => {
          api
            .updateStudent(replistId, {
              title: currentValue
            })
            .then(() => {
              console.log(`update replist ${replistId}`, currentValue);
            })
            .catch(e => {
              console.log("An API error occurred", e);
            });
        }
      );
    }
  };
  clearCompleted = () => {
    const { replists } = this.state;

    // Optimistically remove replists from UI
    const data = replists.reduce(
      (acc, current) => {
        if (current.data.completed) {
          // save item being removed for rollback
          acc.completedStudentIds = acc.completedStudentIds.concat(
            getStudentId(current)
          );
          return acc;
        }
        // filter deleted replist out of the replists list
        acc.optimisticState = acc.optimisticState.concat(current);
        return acc;
      },
      {
        completedStudentIds: [],
        optimisticState: []
      }
    );

    // only set state if completed replists exist
    if (!data.completedStudentIds.length) {
      alert("Please check off some replists to batch remove them");
      this.closeModal();
      return false;
    }

    this.setState(
      {
        replists: data.optimisticState
      },
      () => {
        setTimeout(() => {
          this.closeModal();
        }, 600);

        api
          .batchDeleteStudents(data.completedStudentIds)
          .then(() => {
            console.log(`Batch removal complete`, data.completedStudentIds);
          })
          .catch(e => {
            console.log("An API error occurred", e);
          });
      }
    );
  };
  closeModal = e => {
    this.setState({
      showMenu: false
    });
  };
  openModal = () => {
    this.setState({
      showMenu: true
    });
  };
  addNewStudentModal = () => {
    console.log("openStudentModal")
    this.setState({
      student: {...userbase},		
      studentModal: true
    });
  };
  openStudentModal = (data) => {
    console.log("openStudentModal", data)
    this.setState({
      studentModal: true,
      studentModelData: data
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  renderStudents() {
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
      const id = getStudentId(replist);
      // only show delete button after create API response returns
      let deleteButton;
      if (ref) {
        deleteButton = (
          <button data-id={id} onClick={this.deleteStudent}>
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
            openStudentModal={this.openStudentModal}
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
        <div className="container">
			
			<Row>
                <Col md="4">
                  <hr className="line-info" />
                  <h1>
                    Students List{" "}
                    <span className="text-info">from the class </span>
                  </h1>
                </Col>
              </Row>
          <h2>
            
			  <Button color="danger" onClick={this.toggle}>NEW</Button>
			  <SettingsIcon
                onClick={this.openModal}
                className="desktop-toggle"
              />
            <SettingsIcon onClick={this.openModal} className="mobile-toggle" />
          </h2>
          
          <div className="row">{this.renderStudents()}</div>
        </div>
        <SettingsMenu
          showMenu={this.state.showMenu}
          handleModalClose={this.closeModal}
          handleClearCompleted={this.clearCompleted}
        />
        
        <Modal isOpen={this.state.studentModal} toggle={this.toggle} className="modal-xl">
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
         <form className="todo-create-wrapper" onSubmit={this.saveTodo}>
			 <Container fluid>
			 <Row>
			 <Col md="6">
                            <FormGroup>
                              <label>Roll No</label>
                              <Input type="text"  value={this.state.roll || ''}  name="roll" onChange={this.onChange}/>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                             <FormGroup>
                              <label>SPR No</label>
                              <Input type="text"  value={this.state.spr || ''}  name="spr" onChange={this.onChange}/>
                            </FormGroup>
                          </Col>
                        </Row>
			 <Row>
			 <Col md="6">
                            <FormGroup>
                              <label>Name</label>
                              <Input type="text"  value={this.state.name || ''}  name="name" onChange={this.onChange}/>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                             <FormGroup>
                              <label>Nick Name</label>
                              <Input type="text"  value={this.state.othername || ''}  name="othername" onChange={this.onChange}/>
                            </FormGroup>
                          </Col>
                        </Row>
			  <Row>
			 <Col md="6">
                            <FormGroup>
                              <label>email</label>
                              <Input type="text"  value={this.state.email || ''}  name="email" onChange={this.onChange}/>
                            </FormGroup>
                          </Col>
                          
                        </Row>
				  <Row>
			 <Col md="6">
                            <FormGroup>
                              <label>work</label>
                              <Input type="text"  value={this.state.work || ''}  name="work" onChange={this.onChange}/>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                             <FormGroup>
                              <label>designation </label>
                              <Input type="text"  value={this.state.designation || ''}  name="designation" onChange={this.onChange}/>
                            </FormGroup>
                          </Col>
                        </Row>
				   <Row>
			 <Col md="6">
                            <FormGroup>
                              <label>dob</label>
                              <Input type="date"  value={this.state.dob || ''}  name="work" onChange={this.onChange}/>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                             <FormGroup>
                              <label>designation </label>
                              <Input type="date"  value={this.state.anniversary || ''}  name="anniversary" onChange={this.onChange}/>
                            </FormGroup>
                          </Col>
                        </Row>
				 <Row>
			 <Col md="6">
                            <FormGroup>
                              <label>work</label>
                              <Input type="text"  value={this.state.work || ''}  name="work" onChange={this.onChange}/>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                             <FormGroup>
                              <label>designation </label>
                              <Input type="text"  value={this.state.designation || ''}  name="designation" onChange={this.onChange}/>
                            </FormGroup>
                          </Col>
                        </Row>
				  <Row>
			 <Col md="6">
                            <FormGroup>
                              <label>native</label>
                              <Input type="text"  value={this.state.native || ''}  name="native" onChange={this.onChange}/>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                             <FormGroup>
                              <label>location </label>
                              <Input type="text"  value={this.state.location || ''}  name="location" onChange={this.onChange}/>
                            </FormGroup>
                          </Col>
                        </Row>
				  <Row>
			 <Col md="6">
                            <FormGroup>
                              <label>native</label>
                              <input
              className="todo-create-input"
              placeholder="Add a todo item"
              name="name"
              ref={el => (this.inputElement = el)}
              autoComplete="off"
              style={{ marginRight: 20 }}
            />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                             <button className="todo-create-button">Create todo</button>
                          </Col>
                        </Row>
			 </Container>
            
         
          </form> </ModalBody>
         
        </Modal>
      </div>
    );
  }
}

function removeOptimisticStudent(todos) {
  // return all 'real' todos
  return todos.filter(todo => {
    return todo.ref;
  });
}

function getStudentId(todo) {
  if (!todo.ref) {
    return null;
  }
  return todo.ref["@ref"].id;
}
