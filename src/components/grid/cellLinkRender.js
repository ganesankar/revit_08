import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class CellLinkRenderer extends Component {
  constructor(props) {
    super(props);
    this.openUserEdit = this.openUserEdit.bind(this);
    this.openUserView = this.openUserView.bind(this);
  }

  openUserEdit() {
    console.log('openUserEdit');
    const { context, node } = this.props;
    context && context.componentParent.openUserModal(node.data.id);
  }
  openUserView() {
    console.log('openUserView');
    const { context, node } = this.props;
    context && context.componentParent.openUserView(node.data.id);
  }

  renderSwitch(param) {
    const { colDef, value, data, context } = this.props;
    switch (param) {
      case "action":
        return (
          <button
            onClick={() => this.openUserEdit()}
            className={`btn-icon btn-round btn btn-primary  btn-sm`}
          >
            {" "}
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>
        );
      case "name":
        return (
          <span>
            <button
              onClick={() => this.openUserView()}
              className={`btn-link btn btn-success  btn-sm`}
            >
              {" "}
              {data.name}
            </button>
            {/*
            <NavLink
              className="btn-link btn btn-success"
              to={{ pathname: "/student/" + data.id }}
            >
              {data.name}
            </NavLink> */}
          </span>
        );
      default:
        return "foo";
    }
  }

  render() {
    const { colDef, value, data, context } = this.props;

    return <span>{this.renderSwitch(colDef.field)}</span>;
  }
}
