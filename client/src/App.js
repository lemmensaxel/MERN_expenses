import React, { Component } from "react";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import ExpensesTable from "./components/ExpensesTable";
import UsersTable from "./components/UsersTable";
import {
  Button,
  Icon,
  Modal,
  Header,
  Form,
  Input,
  Label
} from "semantic-ui-react";

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
      <div className="App">
        <AppNavbar
          onClickExpenses={this.onClickExpenses}
          onClickUsers={this.onClickUsers}
          user={this.state.user}
        />

        {this.state.active === "Expenses" && (
          <div style={{ margin: 10 }}>
            <Modal
              trigger={
                <Button icon>
                  <Icon name="add" /> Add expense
                </Button>
              }
              size="small"
            >
              <Header icon="money" content="Add new expense" />
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <label>Name</label>
                    <input placeholder="Name" />
                  </Form.Field>
                  <Form.Field>
                    <label>Amount</label>
                    <Input
                      labelPosition="right"
                      type="text"
                      placeholder="Amount"
                    >
                      <Label basic>€</Label>
                      <input />
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label>Payed by</label>
                    <input placeholder="Payed By" />
                  </Form.Field>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button color="green" inverted>
                  <Icon name="add" /> Add expense
                </Button>
              </Modal.Actions>
            </Modal>
            <ExpensesTable />
          </div>
        )}
        {this.state.active === "Users" && (
          <div style={{ margin: 10 }}>
            <Modal
              trigger={
                <Button icon>
                  <Icon name="add" /> Add user
                </Button>
              }
              size="small"
            >
              <Header icon="user" content="Add new user" />
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <label>Name</label>
                    <input placeholder="Name" />
                  </Form.Field>
                  <Form.Field>
                    <label>Email</label>
                    <Input iconPosition="left" placeholder="Email">
                      <Icon name="at" />
                      <input />
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <label>Username</label>
                    <input placeholder="Username" />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input type="password" placeholder="Password" />
                  </Form.Field>
                  <Form.Field>
                    <label>Level</label>
                    <input placeholder="Level" />
                  </Form.Field>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button color="green" inverted>
                  <Icon name="add" /> Add user
                </Button>
              </Modal.Actions>
            </Modal>
            <UsersTable />
          </div>
        )}
      </div>
    );
  }
}

export default App;
