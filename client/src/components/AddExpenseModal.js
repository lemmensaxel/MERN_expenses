import React, { Component } from "react";
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Input,
  Label
} from "semantic-ui-react";

import uuid from "uuid";

// Redux
import { connect } from "react-redux";
import { addExpense } from "../actions/expenseActions";

import PropTypes from "prop-types";

class AddExpenseModal extends Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newExpense = {
      id: uuid(),
      name: this.state.name,
      amount: this.state.amount,
      payedBy: this.state.payedBy,
      date: this.state.date
    };
    // Add expense via addExpense action
    this.props.addExpense(newExpense);

    // Close the modal
    this.setState({ modalOpen: false });
  };

  render() {
    return (
      <Modal
        trigger={
          <Button icon onClick={() => this.setState({ modalOpen: true })}>
            <Icon name="add" /> Add expense
          </Button>
        }
        size="small"
        open={this.state.modalOpen}
        onClose={() => this.setState({ modalOpen: false })}
      >
        <Header icon="money" content="Add new expense" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input placeholder="Name" onChange={this.onChange} name="name" />
            </Form.Field>
            <Form.Field>
              <label>Amount</label>
              <Input
                labelPosition="right"
                type="text"
                placeholder="Amount"
                onChange={this.onChange}
                name="amount"
              >
                <Label basic>€</Label>
                <input />
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Payed by</label>
              <input
                placeholder="Payed By"
                onChange={this.onChange}
                name="payedBy"
              />
            </Form.Field>
            <Form.Field>
              <label>Date</label>
              <input
                type="date"
                placeholder="Date"
                onChange={this.onChange}
                name="date"
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={this.onSubmit}>
            <Icon name="add" /> Add expense
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

AddExpenseModal.propTypes = {
  addExpense: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  expense: state.expense
});

export default connect(
  mapStateToProps,
  { addExpense }
)(AddExpenseModal);
