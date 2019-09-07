import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col
} from "reactstrap";

export default class UserItemCard extends Component {
  render() {
    const { student, getStudentLoading } = this.props;
    const userIcon =
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxwYXRoIGQ9Ik0yMi40MTcsMTQuODM2Yy0xLjIwOSwyLjc2My0zLjg0Niw1LjA3NC02LjQwMyw1LjA3NGMtMy4xMjIsMC01LjM5LTIuMjg0LTYuNTk5LTUuMDQ2ICAgYy03LjAzMSwzLjY0Mi02LjE0NSwxMi44NTktNi4xNDUsMTIuODU5YzAsMS4yNjIsMC45OTQsMS40NDUsMi4xNjIsMS40NDVoMTAuNTgxaDEwLjU2NWMxLjE3LDAsMi4xNjctMC4xODQsMi4xNjctMS40NDUgICBDMjguNzQ2LDI3LjcyMywyOS40NDcsMTguNDc5LDIyLjQxNywxNC44MzZ6IiBmaWxsPSIjNTE1MTUxIi8+PHBhdGggZD0iTTE2LjAxMywxOC40MTJjMy41MjEsMCw2LjMyLTUuMDQsNi4zMi05LjIwNGMwLTQuMTY1LTIuODU0LTcuNTQxLTYuMzc1LTcuNTQxICAgYy0zLjUyMSwwLTYuMzc2LDMuMzc2LTYuMzc2LDcuNTQxQzkuNTgyLDEzLjM3MywxMi40OTEsMTguNDEyLDE2LjAxMywxOC40MTJ6IiBmaWxsPSIjNTE1MTUxIi8+PC9nPjwvc3ZnPg==";
    const userImage = (
      <div className="icon icon-primary">
        {" "}
        <img
          alt="cmsImage"
          className="img-center img-fluid"
          src={student && student.flagimg ? student.flagimg.base64 : userIcon}
        />
      </div>
    );

    return (
      <React.Fragment>
        <Container className="align-items-center pt-5">
          <Row>
            <Col lg="6" md="6">
              <h5 className="text-on-back">{student.roll || ""}</h5>
              <h1 className="profile-title text-left"> {student.name || ""}</h1>
              <h4 className="text-on-back-sm">{student.spr || ""}</h4>
              <p className="profile-description">{student.description || ""}</p>
              <div className="btn-wrapper profile pt-3">
                {student.social &&
                  Object.keys(student.social).map(sociallink => {
                    return (
                      <React.Fragment key={sociallink}>
                        {student.social[sociallink] && (
                          <a
                            rel="noopener noreferrer"
                            color={sociallink}
                            href={student.social[sociallink]}
                            target="_blank"
                            className="btn btn-icon btn-round"
                          >
                            <i className={`fa fa-${sociallink}`}></i>
                          </a>
                        )}
                      </React.Fragment>
                    );
                  })}
              </div>
            </Col>
            <Col className="ml-auto mr-auto" lg="6" md="6">
              <Card className="card-coin card-plain">
                <CardHeader>
                  <img
                    alt="cmsImage"
                    className="img-center img-fluid  rounded-circle"
                    src={student.flagimg ? student.flagimg.base64 : userIcon}
                  />
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="text-center" md="12">
                      <h4 className="text-uppercase">{student.nickname}</h4>
                      <hr className="line-success" />
                    </Col>
                  </Row>
                  <Row>
                    <ListGroup>
                      {student.dob && (
                        <ListGroupItem> <i className="fa  fa-birthday-cake"></i> {student.dob}</ListGroupItem>
                      )}
                      {student.anniversary && (
                        <ListGroupItem> <i className="fa fa-star"></i> {student.anniversary}</ListGroupItem>
                      )}
                      {student.email && (
                        <ListGroupItem><i className="fa fa-envelope"></i> {student.email}</ListGroupItem>
                      )}
                      {student.location && (
                        <ListGroupItem><i className="fa fa-map-marker"></i>  {student.location}</ListGroupItem>
                      )}
                      {student.native && (
                        <ListGroupItem><i className="fa fa-street-view"></i>  {student.native}</ListGroupItem>
                      )}
                      {student.work && (
                        <ListGroupItem><i className="fa fa-briefcase"></i>  {student.work} - {student.designation}</ListGroupItem>
                      )}
                      
                    </ListGroup>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
