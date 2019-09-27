import React, { Component } from "react";
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
  Container
} from "reactstrap";
import PostListItem from "./../components/list/postListItem";
import FormGroupInput from "./../components/form/formGroupInput";

import api from "./../utils/api";
import sortByDate from "./../utils/sortByDate";
import isLocalHost from "./../utils/isLocalHost";

const userbase = {
  title: "College Link",
  caregory: "College Link",
  tags: "college, website",
  ts: "",
  description: "",
  slug: "",
  flagimg: {}
};
export default class Articles extends Component {
  state = {
    todos: [],
    context: { componentParent: this },
    article: {},
    articleModelData: { ...userbase },
    articleModal: false,
    articleViewModal: false,
    showMenu: false
  };
  componentDidMount() {
    // Fetch all todos
    api.readAllArticles().then(replists => {
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
      if (replists.length > 0) {
        replists.forEach(function(item, index) {
          let itemis = item.data;
          itemis.act = index;
          itemis.id = getArticleId(item);
          optimisedData.push(itemis);
        });
        this.setState({
          replists: replists,
          gridData: optimisedData
        });
      } else {
        this.setState({
          replists: [],
          gridData: []
        });
      }
    });
  }
  toggle = () => {
    const { articleModal } = this.state;
    this.setState({
      articleModal: !articleModal
    });
  };

  saveArticle = () => {
    const { articleModelData } = this.state;
    articleModelData.ts = new Date().getTime() * 10000;

    if (articleModelData.id) {
      api
        .updateArticle(articleModelData.id, articleModelData)
        .then(() => {
          ToastsStore.success(`Profile Changes Updated!`);
        })
        .catch(e => {
          console.log("An API error occurred", e);
          ToastsStore.error(`Profile Update Failed!`);
        });
    } else {
      api
        .createArticle(articleModelData)
        .then(response => {
          ToastsStore.success(`Profile Created Succesfully!`);
        })
        .catch(e => {
          console.log("An API error occurred", e);
          ToastsStore.error(`Profile Creation Failed!`);
        });
    }
  };
  deleteArticle = e => {
    const { replists } = this.state;
    const replistId = e.target.dataset.id;

    // Optimistically remove replist from UI
    const filteredArticles = replists.reduce(
      (acc, current) => {
        const currentId = getArticleId(current);
        if (currentId === replistId) {
          // save item being removed for rollback
          acc.rollbackArticle = current;
          return acc;
        }
        // filter deleted replist out of the replists list
        acc.optimisticState = acc.optimisticState.concat(current);
        return acc;
      },
      {
        rollbackArticle: {},
        optimisticState: []
      }
    );

    this.setState({
      replists: filteredArticles.optimisticState
    });

    // Make API request to delete replist
    api
      .deleteArticle(replistId)
      .then(() => {
        console.log(`deleted replist id ${replistId}`);
      })
      .catch(e => {
        console.log(`There was an error removing ${replistId}`, e);
        // Add item removed back to list
        this.setState({
          replists: filteredArticles.optimisticState.concat(
            filteredArticles.rollbackArticle
          )
        });
      });
  };

  newArticleModal = () => {
    const articleItem = { ...userbase };

    this.setState({
      articleModal: true,
      articleModelData: articleItem
    });
  };
  openUserModal = id => {
    console.log("openUserModal", id);
    const articleItem = this.state.gridData.find(o => o.id === id);

    console.log(articleItem);
    this.setState({
      articleModal: true,
      articleModelData: articleItem
    });
  };
  openUserView = id => {
    console.log("openUserView", id);
    const { articleViewModal } = this.state;
    const articleItem = this.state.gridData.find(o => o.id === id);
    this.setState({
      articleViewModal: !articleViewModal,
      articleModelData: articleItem
    });
  };
  toogleArticleView = () => {
    const { articleViewModal } = this.state;
    this.setState({
      articleViewModal: !articleViewModal
    });
  };

  onChange = e => {
    console.log("ose", e);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onInputChange = (na, val) => {
    const { articleModelData } = this.state;
    articleModelData[na] = val;
    this.setState({ articleModelData });
  };

  onEditorStateChange = editorState => {
    const { articleModelData } = this.state;
    articleModelData.description = editorState;
    this.setState({ articleModelData });
  };

  fileChangedHandler = files => {
    console.log("file", files);

    const { articleModelData } = this.state;
    if (files.size) {
      const fileSize = files.size.replace("kB", "").trim();
      console.log("fileSize", fileSize);
      if (Number(fileSize) > 1000) {
        ToastsStore.error("Upload Image less than 1 MB");
      } else {
        articleModelData.flagimg = files;
        this.setState({ articleModelData });
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
  renderArticles() {
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
      const id = getArticleId(replist);
      // only show delete button after create API response returns

      return (
        <Row key={i}>
          <PostListItem
            html={data.name}
            profileData={data}
            profileRef={id}
            viewLink={true}
            editLink={true}
            openUserModal={this.openUserModal}
            editPath="/article/edit/"
            viewPath="/article/"
          />
        </Row>
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
                Articles List
                <br /> <span className="text-info">from the class </span>
              </h1>
            </Col>
            <Col md="4"></Col>
            <Col md="4">
              <div className="text-right pt-5">
                <Button color="danger" onClick={this.newArticleModal}>
                  NEW
                </Button>
                <Button color="danger" onClick={this.download}>
                  Download
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <hr className="line-info" />
              <h2>
                <span className="text-info">Category</span>
              </h2>
            </Col>
            <Col md="8">
              {" "}
              <Container fluid>{this.renderArticles()}</Container>{" "}
            </Col>
          </Row>
        </div>

        <Modal
          isOpen={this.state.articleModal}
          toggle={this.toggle}
          className="modal-xl"
        >
          <ModalHeader toggle={this.toggle}>
            <hr className="line-info" />
            <h3>
              Articles Edit{" "}
              <span className="text-info">
                {" "}
                {this.state.articleModelData.name}{" "}
              </span>
            </h3>
          </ModalHeader>
          <ModalBody>
            <form
              className="todo-create-wrapper"
              onSubmit={e => {
                e.preventDefault();
                this.saveArticle();
              }}
            >
              <Container fluid>
                <Row>
                  <Col md="9">
                    <Container fluid>
                      <Row>
                        <Col md="12">
                          <FormGroupInput
                            nameValue={this.state.articleModelData.title}
                            label="Title"
                            name="title"
                            onInputChange={this.onInputChange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          {/**
                          <Editor
                            editorState={this.state.articleModelData.description}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={this.onEditorStateChange}
                          /> */}
                          <FormGroupInput
                            nameValue={this.state.articleModelData.description}
                            label="Title"
                            name="description"
                            type="textarea"
                            onInputChange={this.onInputChange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroupInput
                            nameValue={this.state.articleModelData.caregory}
                            label="E Mail"
                            name="caregory"
                            onInputChange={this.onInputChange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroupInput
                            nameValue={this.state.articleModelData.tags}
                            label="Tags"
                            name="tags"
                            onInputChange={this.onInputChange}
                          />
                        </Col>
                      </Row>
                    </Container>
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
                        {this.state.articleModelData.flagimg &&
                          this.state.articleModelData.flagimg.base64 && (
                            <img
                              alt="student"
                              src={`${this.state.articleModelData.flagimg.base64}`}
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
          isOpen={this.state.articleViewModal}
          toggle={this.toogleArticleView}
          className="modal-xl"
        >
          <ModalHeader toggle={this.toogleArticleView}>
            <hr className="line-info" />
            <h3>
              <span className="text-info">
                {" "}
                {this.state.articleModelData.name}{" "}
              </span>
            </h3>
          </ModalHeader>
          <ModalBody></ModalBody>
        </Modal>
      </div>
    );
  }
}

function getArticleId(todo) {
  if (!todo.ref) {
    return null;
  }
  return todo.ref["@ref"].id;
}
