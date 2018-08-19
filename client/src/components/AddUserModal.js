import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form, Input } from "semantic-ui-react";

import uuid from "uuid";

// Redux
import { connect } from "react-redux";
import { addUser } from "../actions/userActions";

import PropTypes from "prop-types";

class AddUserModal extends Component {
  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      id: uuid(),
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      level: this.state.level
    };
    // Add expense via addExpense action
    this.props.addUser(newUser);

    // Close the modal
    this.setState({ modalOpen: false });
  };

  render() {
    return (
      <Modal
        trigger={
          <Button icon onClick={() => this.setState({ modalOpen: true })}>
            <Icon name="add" /> Add user
          </Button>
        }
        size="small"
        open={this.state.modalOpen}
        onClose={() => this.setState({ modalOpen: false })}
      >
        <Header icon="user" content="Add new user" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input placeholder="Name" name="name" onChange={this.onChange} />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Input
                iconPosition="left"
                placeholder="Email"
                name="email"
                onChange={this.onChange}
              >
                <Icon name="at" />
                <input />
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Username</label>
              <input
                placeholder="Username"
                name="username"
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Level</label>
              <input
                placeholder="Level"
                name="level"
                onChange={this.onChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={this.onSubmit}>
            <Icon name="add" /> Add user
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

AddUserModal.propTypes = {
  addUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { addUser }
)(AddUserModal);
