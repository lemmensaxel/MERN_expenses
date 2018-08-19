import React, { Component } from "react";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import ExpensesTable from "./components/ExpensesTable";
import UsersTable from "./components/UsersTable";

import AddExpenseModal from "./components/AddExpenseModal";
import AddUserModal from "./components/AddUserModal";

// Redux
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  state = {
    user: {
      name: "Axel Lemmens",
      username: "lemmensaxel",
      level: 2
    },
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
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar
            onClickExpenses={this.onClickExpenses}
            onClickUsers={this.onClickUsers}
            user={this.state.user}
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
      </Provider>
    );
  }
}

export default App;
