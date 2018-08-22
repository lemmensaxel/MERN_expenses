import React, { Component } from "react";
import "./App.css";

import MainPage from "./components/MainPage";

// Redux
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainPage />
      </Provider>
    );
  }
}

export default App;
