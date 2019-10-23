import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header/Header";
import Thankyou from "./ThankYou/Thankyou"

const Dashboard = () => <h2>Dashboard</h2>;
const Landing = () => <h2>Landing</h2>;


class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <main className="container">
              <Route exact path="/" component={Landing} />
              <Route path="/surveys" component={Dashboard} />
              <Route path="/thankyou" component={Thankyou} />

            </main>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
