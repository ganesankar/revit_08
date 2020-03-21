import React, { Component } from "react";
import UserIcon from "../common/icons/UserIcon.js";
export default class UserListCard extends Component {
  render() {
    const { user } = this.props;
    let userImage = "";
    if (user && user.flagimg && user.flagimg.base64) {
      userImage = (
        <div className="icon icon-primary">
          <img alt="cmsImage" className="img50" src={user.flagimg.base64} />
        </div>
      );
    } else {
      userImage = <UserIcon />;
    }

    return (
      <React.Fragment>
        <div className="card sm card-stu">
          <div className="card-body ">
            <div className="row flex-middle">
              <div className=" col"> {userImage}</div>
              <div className=" col">
                <h4 className="card-title">
                  <h4
                    onClick={() => {
                      this.props.openUserModal(user.id);
                    }}
                    className="pt-1 info-title"
                  >
                    {user.name}{" "}
                  </h4>
                </h4>
                <h5 className="card-subtitle ">{user.location}</h5>
                <p className="card-text"></p>

                <button
                  className="card-link btn-small btn-white"
                  onClick={() => {
                    this.props.openUserView(user.id);
                  }}
                >
                  VIEW
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
