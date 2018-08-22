import React, { Component } from "react";
import { Table, Icon, Loader, Dimmer } from "semantic-ui-react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { getUsers, deleteUser, login, logout } from "../actions/userActions";
import EditUserModal from "../components/EditUserModal";

class UsersTable extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  onDeleteClick = id => {
    this.props.deleteUser(id);
  };

  render() {
    if (this.props.user.loading) {
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
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Level</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.user.users.map(user => {
              return (
                <Table.Row>
                  <Table.Cell>{user._id}</Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.level}</Table.Cell>
                  <Table.Cell>
                    <EditUserModal selection={user} />
                  </Table.Cell>
                  <Table.Cell>
                    <Icon
                      name="delete"
                      size="large"
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={this.onDeleteClick.bind(this, user.id)}
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

UsersTable.propTypes = {
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUsers, deleteUser, login, logout }
)(UsersTable);
