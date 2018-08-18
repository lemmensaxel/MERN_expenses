import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";

export default class ExpensesTable extends Component {
  state = {
    items: [
      {
        name: "Vliegtuig tickets",
        amount: 654.65,
        payedBy: "Axel Lemmens",
        date: "18/08/2018"
      },
      {
        name: "Autohuur",
        amount: 123.45,
        payedBy: "Axel Lemmens",
        date: "18/08/2018"
      }
    ]
  };
  render() {
    return (
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Payed by</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.items.map(item => {
            return (
              <Table.Row>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>
                  &euro;
                  {item.amount}
                </Table.Cell>
                <Table.Cell>{item.payedBy}</Table.Cell>
                <Table.Cell>{item.date}</Table.Cell>
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
