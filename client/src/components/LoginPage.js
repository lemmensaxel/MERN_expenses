import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message
} from "semantic-ui-react";

import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { login } from "../actions/userActions";

class LoginPage extends Component {
  state = {
    username: "",
    password: ""
  };

  login = () => {
    if (this.state.username !== "" && this.state.password !== "") {
      this.props.login(this.state.username, this.state.password);
      this.setState({
        username: "",
        password: ""
      });
    }
  };

  render() {
    return (
      <div className="login-form">
        {/*
              Heads up! The styles below are necessary for the correct render of this example.
              You can do same with CSS, the main idea is that all the elements up to the `Grid`
              below must have a height of 100%.
            */}
        <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Log-in to Expensify!
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={this.login.bind(this)}
                >
                  Login
                </Button>
              </Segment>
            </Form>
            {this.props.user.errorMessage && (
              <Message color="red">{this.props.user.errorMessage}</Message>
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  user: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { login }
)(LoginPage);
