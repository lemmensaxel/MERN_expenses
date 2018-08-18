import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { getExpenses } from "../actions/expenseActions";

class ExpensesTable extends Component {
  componentDidMount() {
    this.props.getExpenses();
  }

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
          {this.props.expense.expenses.map(item => {
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

ExpensesTable.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  expense: state.expense
});

export default connect(
  mapStateToProps,
  { getExpenses }
)(ExpensesTable);
