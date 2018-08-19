import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form, Input } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";
import { editUser } from "../actions/userActions";

import PropTypes from "prop-types";

class EditUserModal extends Component {
  state = { modalOpen: false };

  componentWillMount() {
    this.setState({
      name: this.props.selection.name,
      email: this.props.selection.email,
      username: this.props.selection.username,
      password: this.props.selection.password,
      level: this.props.selection.level
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

    const newUser = {
      id: this.props.selection.id,
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      level: this.state.level
    };
    // Add expense via addExpense action
    this.props.editUser(newUser);

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
        <Header icon="edit" content="Edit user" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Name"
                name="name"
                onChange={this.onChange}
                value={this.state.name}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Input
                iconPosition="left"
                placeholder="Email"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
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
                value={this.state.username}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.onChange}
                value={this.state.password}
              />
            </Form.Field>
            <Form.Field>
              <label>Level</label>
              <input
                placeholder="Level"
                name="level"
                onChange={this.onChange}
                value={this.state.level}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={this.onSubmit}>
            <Icon name="edit" /> Edit user
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

EditUserModal.propTypes = {
  editUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { editUser }
)(EditUserModal);
