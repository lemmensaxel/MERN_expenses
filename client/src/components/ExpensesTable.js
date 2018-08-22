import React, { Component } from "react";
import Moment from "moment";
import { Table, Icon, Loader, Dimmer } from "semantic-ui-react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { getExpenses, deleteExpense } from "../actions/expenseActions";
import { getUsers } from "../actions/userActions";
import EditExpenseModal from "./EditExpenseModal";

class ExpensesTable extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getExpenses();
  }

  onDeleteClick = id => {
    this.props.deleteExpense(id);
  };

  findName = id => {
    return this.props.user.users.filter(user => user._id === id)[0].name;
  };

  render() {
    if (this.props.expense.loading) {
      return (
        <div className="App">
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        </div>
      );
    } else {
      return (
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Payed by</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.expense.expenses.map(expense => {
              return (
                <Table.Row>
                  <Table.Cell>{expense._id}</Table.Cell>
                  <Table.Cell>{expense.name}</Table.Cell>
                  <Table.Cell>
                    &euro;
                    {expense.amount}
                  </Table.Cell>
                  <Table.Cell>{this.findName(expense.payedBy)}</Table.Cell>
                  <Table.Cell>
                    {Moment(expense.date).format("DD/MM/YYYY")}
                  </Table.Cell>
                  <Table.Cell>
                    <EditExpenseModal selection={expense} />
                  </Table.Cell>
                  <Table.Cell>
                    <Icon
                      name="delete"
                      size="large"
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={this.onDeleteClick.bind(this, expense.id)}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      );
    }
  }
}

ExpensesTable.propTypes = {
  getExpenses: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  expense: state.expense,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getExpenses, getUsers, deleteExpense }
)(ExpensesTable);
