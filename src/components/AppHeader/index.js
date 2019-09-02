import React from "react";
import styles from "./AppHeader.css"; // eslint-disable-line
import { Link } from "react-router-dom";
// reactstrap components
import { NavbarBrand, Navbar, Container, Row, Col } from "reactstrap";

const AppHeader = props => {
  return (
    <Navbar className={"fixed-top "} color-on-scroll="100" expand="lg">
      <Container>
       

        <div className="navbar">
          <Row>
            <Col >
              <a href="#pablo" onClick={e => e.preventDefault()}>
               REVIT 
              </a>
            </Col>
            <Col className="collapse-close text-right" xs="6"></Col>
          </Row>
        </div>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
