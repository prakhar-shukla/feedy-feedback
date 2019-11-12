import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header/Header";
import Dashboard from "./Dashboard/Dashboard";
import Thankyou from "./ThankYou/Thankyou";
import SurveyNew from "./Surveys/SurveyNew";

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
              <div className="content-area" style={{ margin: "20px 0" }}>
                <Route exact path="/" component={Landing} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/surveys/new" component={SurveyNew} />
                <Route path="/thankyou" component={Thankyou} />
              </div>
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
