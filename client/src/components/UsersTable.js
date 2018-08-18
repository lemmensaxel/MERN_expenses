import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { getUsers } from "../actions/userActions";

class UsersTable extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

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
          {this.props.user.users.map(user => {
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

UsersTable.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUsers }
)(UsersTable);
