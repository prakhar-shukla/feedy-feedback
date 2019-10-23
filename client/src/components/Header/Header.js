import React from "react";
import "./header.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payment from "../PaymentPage/Payment";

class Header extends React.Component {
  renderHeaderContent() {
    switch (this.props.auth) {
      case null:
        return "";
      case false: {
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      }
      default: {
        return (
          <>
            <li>
              <p>Credits: {this.props.auth.credits}</p>
            </li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </>
        );
      }
    }
  }

  render() {
    console.log(this.props);
    return (
      <header>
        <div className="container">
          <Link className="logo" to={this.props.auth ? "/surveys" : "/"}>
            Feedy Feedback
          </Link>
          <nav>
            <ul>
              <li>
                <Payment amount="10" />
              </li>
              {this.renderHeaderContent()}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
