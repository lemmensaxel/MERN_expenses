import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";

export default class UsersTable extends Component {
  state = {
    users: [
      {
        name: "Axel Lemmens",
        username: "lemmensaxel",
        password: "Test123",
        salt: "fn,dklosmn cqtu qzeormi cfjuifgqhsd",
        email: "lemmensaxel@gmail.com",
        level: 2
      },
      {
        name: "Birte Geusens",
        username: "birte",
        password: "Test123",
        salt: "fn,dklosmn cqtu qzeormi cfjuifgqhsd",
        email: "dauwdruppelke@gmail.com",
        level: 1
      }
    ]
  };
  render() {
    return (
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Level</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.users.map(user => {
            return (
              <Table.Row>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.level}</Table.Cell>
                <Table.Cell>
                  <Icon name="edit" size="large" />
                </Table.Cell>
                <Table.Cell>
                  <Icon name="delete" size="large" color="red" />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}
