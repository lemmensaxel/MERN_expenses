import React, { Component } from "react";

import AppNavbar from "./AppNavbar";
import ExpensesTable from "./ExpensesTable";
import UsersTable from "./UsersTable";

import AddExpenseModal from "./AddExpenseModal";
import AddUserModal from "./AddUserModal";

import LoginPage from "./LoginPage";

import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

class MainPage extends Component {
  state = {
    active: "Expenses"
  };

  onClickExpenses = () => {
    this.setState({
      active: "Expenses"
    });
  };

  onClickUsers = () => {
    this.setState({
      active: "Users"
    });
  };

  render() {
    if (this.props.user.currentUser) {
      return (
        <div className="App">
          <AppNavbar
            onClickExpenses={this.onClickExpenses}
            onClickUsers={this.onClickUsers}
          />

          {this.state.active === "Expenses" && (
            <div style={{ margin: 10 }}>
              <AddExpenseModal />
              <ExpensesTable />
            </div>
          )}
          {this.state.active === "Users" && (
            <div style={{ margin: 10 }}>
              <AddUserModal />
              <UsersTable />
            </div>
          )}
        </div>
      );
    } else {
      return <LoginPage />;
    }
  }
}

MainPage.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  {}
)(MainPage);
