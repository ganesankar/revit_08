import React, { Component } from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import {
  
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

export default class Calendar extends Component {
  state = {
    todos: []
  };
  componentDidMount() {
    // Fetch all todos
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
                Calendar
                <br /> <span className="text-info"> Events created </span>
              </h1>
            </Col>
            <Col md="4"></Col>
            <Col md="4"></Col>
          </Row>

          <div className="row">
            {/*this.renderStudents()*/}
            <Card className="card-coin card-plain">
              <CardBody>Coming Soon</CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
