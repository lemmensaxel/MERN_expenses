import React, { Component } from "react";
import { Menu, Dropdown } from "semantic-ui-react";

export default class AppNavbar extends Component {
  state = {
    activeItem: "Expenses"
  };

  render() {
    return (
      <Menu size="massive" secondary pointing stackable>
        <Menu.Item>
          <strong>
            <h2>Expensify</h2>
          </strong>
        </Menu.Item>

        <Menu.Item
          name="Expenses"
          active={this.state.activeItem === "Expenses"}
          onClick={() => {
            this.setState({ activeItem: "Expenses" });
            this.props.onClickExpenses();
          }}
        >
          Expenses
        </Menu.Item>

        <Menu.Item
          name="Users"
          active={this.state.activeItem === "Users"}
          onClick={() => {
            this.setState({ activeItem: "Users" });
            this.props.onClickUsers();
          }}
          disabled={this.props.user.level < 2}
        >
          Users
        </Menu.Item>
        <Menu.Menu position="right">
          <Dropdown item text={this.props.user.name}>
            <Dropdown.Menu>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}
