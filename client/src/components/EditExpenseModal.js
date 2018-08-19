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

// Redux
import { connect } from "react-redux";
import { editExpense } from "../actions/expenseActions";

import PropTypes from "prop-types";

class EditExpenseModal extends Component {
  state = { modalOpen: false };

  componentWillMount() {
    this.setState({
      name: this.props.selection.name,
      amount: this.props.selection.amount,
      payedBy: this.props.selection.payedBy,
      date: this.props.selection.date
    });
  }

  handleOpen = () => this.setState({ modalOpen: true });

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newExpense = {
      id: this.props.selection.id,
      name: this.state.name,
      amount: this.state.amount,
      payedBy: this.state.payedBy,
      date: this.state.date
    };
    // Edit expense via addExpense action
    this.props.editExpense(newExpense);

    // Close the modal
    this.setState({ modalOpen: false });
  };

  render() {
    return (
      <Modal
        trigger={
          <Icon
            name="edit"
            size="large"
            style={{ cursor: "pointer" }}
            onClick={() => this.setState({ modalOpen: true })}
          />
        }
        size="small"
        open={this.state.modalOpen}
        onClose={() => this.setState({ modalOpen: false })}
      >
        <Header icon="edit" content="Edit expense" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Name"
                onChange={this.onChange}
                name="name"
                value={this.state.name}
              />
            </Form.Field>
            <Form.Field>
              <label>Amount</label>
              <Input
                labelPosition="right"
                type="text"
                placeholder="Amount"
                onChange={this.onChange}
                name="amount"
                value={this.state.amount}
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
                value={this.state.payedBy}
              />
            </Form.Field>
            <Form.Field>
              <label>Date</label>
              <input
                type="date"
                placeholder="Date"
                onChange={this.onChange}
                name="date"
                value={this.state.date}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={this.onSubmit}>
            <Icon name="edit" /> Edit expense
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

EditExpenseModal.propTypes = {
  editExpense: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  expense: state.expense
});

export default connect(
  mapStateToProps,
  { editExpense }
)(EditExpenseModal);
