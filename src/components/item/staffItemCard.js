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

export default class StaffItemCard extends Component {
  render() {
    const { staff, getstaffLoading } = this.props;
    const userIcon =
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxwYXRoIGQ9Ik0yMi40MTcsMTQuODM2Yy0xLjIwOSwyLjc2My0zLjg0Niw1LjA3NC02LjQwMyw1LjA3NGMtMy4xMjIsMC01LjM5LTIuMjg0LTYuNTk5LTUuMDQ2ICAgYy03LjAzMSwzLjY0Mi02LjE0NSwxMi44NTktNi4xNDUsMTIuODU5YzAsMS4yNjIsMC45OTQsMS40NDUsMi4xNjIsMS40NDVoMTAuNTgxaDEwLjU2NWMxLjE3LDAsMi4xNjctMC4xODQsMi4xNjctMS40NDUgICBDMjguNzQ2LDI3LjcyMywyOS40NDcsMTguNDc5LDIyLjQxNywxNC44MzZ6IiBmaWxsPSIjNTE1MTUxIi8+PHBhdGggZD0iTTE2LjAxMywxOC40MTJjMy41MjEsMCw2LjMyLTUuMDQsNi4zMi05LjIwNGMwLTQuMTY1LTIuODU0LTcuNTQxLTYuMzc1LTcuNTQxICAgYy0zLjUyMSwwLTYuMzc2LDMuMzc2LTYuMzc2LDcuNTQxQzkuNTgyLDEzLjM3MywxMi40OTEsMTguNDEyLDE2LjAxMywxOC40MTJ6IiBmaWxsPSIjNTE1MTUxIi8+PC9nPjwvc3ZnPg==";
    const userImage = (
      <div className="icon icon-primary">
        {" "}
        <img
          alt="cmsImage"
          className="img-center img-fluid"
          src={staff && staff.flagimg ? staff.flagimg.base64 : userIcon}
        />
      </div>
    );

    return (
      <React.Fragment>
        <Container className="align-items-center pt-5">
          <Row>
            <Col lg="6" md="6">
              <h5 className="text-on-back">{staff.roll || ""}</h5>
              <h1 className="profile-title text-left"> {staff.name || ""}</h1>
              <h4 className="text-on-back-sm">{staff.spr || ""}</h4>
              <p className="profile-description">{staff.description || ""}</p>
              <div className="btn-wrapper profile pt-3">
                {staff.social &&
                  Object.keys(staff.social).map(sociallink => {
                    return (
                      <React.Fragment key={sociallink}>
                        {staff.social[sociallink] && (
                          <a
                            rel="noopener noreferrer"
                            color={sociallink}
                            href={staff.social[sociallink]}
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
                    src={staff.flagimg ? staff.flagimg.base64 : userIcon}
                  />
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="text-center" md="12">
                      <h4 className="text-uppercase">{staff.nickname}</h4>
                      <hr className="line-success" />
                    </Col>
                  </Row>
                  <Row>
                    <ListGroup>
                      {staff.dob && (
                        <ListGroupItem> <i className="fa  fa-birthday-cake"></i> {staff.dob}</ListGroupItem>
                      )}
                      {staff.anniversary && (
                        <ListGroupItem> <i className="fa fa-star"></i> {staff.anniversary}</ListGroupItem>
                      )}
                      {staff.email && (
                        <ListGroupItem><i className="fa fa-envelope"></i> {staff.email}</ListGroupItem>
                      )}
                      {staff.location && (
                        <ListGroupItem><i className="fa fa-map-marker"></i>  {staff.location}</ListGroupItem>
                      )}
                      {staff.native && (
                        <ListGroupItem><i className="fa fa-street-view"></i>  {staff.native}</ListGroupItem>
                      )}
                      {staff.work && (
                        <ListGroupItem><i className="fa fa-briefcase"></i>  {staff.work} - {staff.designation}</ListGroupItem>
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
