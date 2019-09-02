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
    console.log('this.props.student', this.props.student);
    const userIcon =
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxwYXRoIGQ9Ik0yMi40MTcsMTQuODM2Yy0xLjIwOSwyLjc2My0zLjg0Niw1LjA3NC02LjQwMyw1LjA3NGMtMy4xMjIsMC01LjM5LTIuMjg0LTYuNTk5LTUuMDQ2ICAgYy03LjAzMSwzLjY0Mi02LjE0NSwxMi44NTktNi4xNDUsMTIuODU5YzAsMS4yNjIsMC45OTQsMS40NDUsMi4xNjIsMS40NDVoMTAuNTgxaDEwLjU2NWMxLjE3LDAsMi4xNjctMC4xODQsMi4xNjctMS40NDUgICBDMjguNzQ2LDI3LjcyMywyOS40NDcsMTguNDc5LDIyLjQxNywxNC44MzZ6IiBmaWxsPSIjNTE1MTUxIi8+PHBhdGggZD0iTTE2LjAxMywxOC40MTJjMy41MjEsMCw2LjMyLTUuMDQsNi4zMi05LjIwNGMwLTQuMTY1LTIuODU0LTcuNTQxLTYuMzc1LTcuNTQxICAgYy0zLjUyMSwwLTYuMzc2LDMuMzc2LTYuMzc2LDcuNTQxQzkuNTgyLDEzLjM3MywxMi40OTEsMTguNDEyLDE2LjAxMywxOC40MTJ6IiBmaWxsPSIjNTE1MTUxIi8+PC9nPjwvc3ZnPg==";
    const userImage = (
      <div className="icon icon-primary">
        {" "}
        <img
          alt="cmsImage"
          className="img-center img-fluid"
          src={student && student.flagimg ? student.flagimg : userIcon}
        />
      </div>
    );

    return (
      <React.Fragment>
        <Container className="align-items-center pt-5">
          <Row>
            <Col lg="6" md="6">
              <h5 className="text-on-back">{student.roll || ''}</h5>
              <h1 className="profile-title text-left"> {student.name || ''}</h1>
              <h4 className="text-on-back-sm">{student.spr || ''}</h4>
              <p className="profile-description">{student.spr || ''}</p>
              <div className="btn-wrapper profile pt-3">
                {student.social && student.social.length > 0 &&
                  student.social.map(sociallink => {
                    return (
                      <React.Fragment key={sociallink.id}>
                        {sociallink.value && (
                          <a
                            rel="noopener noreferrer"
                            color={sociallink.name}
                            href={sociallink.value}
                            target="_blank"
                            className="btn btn-icon btn-round"
                          >
                            <i class={sociallink.name}></i>
                          </a>
                        )}
                      </React.Fragment>
                    );
                  })}
              </div>
            </Col>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Card className="card-coin card-plain">
                <CardHeader>
                  <img
                    alt="cmsImage"
                    className="img-center img-fluid  rounded-circle"
                    src={student.flagimg ? student.flagimg : userIcon}
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
                        <ListGroupItem> {student.dob}</ListGroupItem>
                      )}
                      {student.anniversary && (
                        <ListGroupItem>{student.anniversary}</ListGroupItem>
                      )}
                      {student.emailid && (
                        <ListGroupItem>{student.email}</ListGroupItem>
                      )}
                      {student.location && (
                        <ListGroupItem>{student.location}</ListGroupItem>
                      )}
                      {student.native && (
                        <ListGroupItem>{student.native}</ListGroupItem>
                      )}
                      {student.work && (
                        <ListGroupItem>{student.work}</ListGroupItem>
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
