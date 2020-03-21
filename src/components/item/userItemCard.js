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
import UserIcon from "../common/icons/UserIcon.js";

export default class UserItemCard extends Component {
  render() {
    const { user } = this.props;
    let userImage = "";
    if (user && user.flagimg && user.flagimg.base64) {
      userImage = (
        <img alt="cmsImage" className="img300" src={user.flagimg.base64} />
      );
    } else {
      userImage = <UserIcon />;
    }

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="sm-12 md-4 lg-3 col"> {userImage}</div>
            <div className="sm-12 md-8 lg-9 col">
              <p className="text-uppercase">{user.othername}</p>
              <p className="text-on-back-sm">{user.spr || ""}</p>
              <p className="profile-description">{user.description || ""}</p>
              <div className="btn-wrapper profile pt-3">
                {user.social &&
                  Object.keys(user.social).map(sociallink => {
                    return (
                      <React.Fragment key={sociallink}>
                        {user.social[sociallink] && (
                          <a
                            rel="noopener noreferrer"
                            color={sociallink}
                            href={user.social[sociallink]}
                            target="_blank"
                            className="btn btn-icon btn-round"
                          >
                            {" "}
                            <i
                              className={`fab fa-${sociallink} text-warning`}
                            ></i>
                          </a>
                        )}
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
