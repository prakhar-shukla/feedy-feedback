import React from "react";
import {Link} from 'react-router-dom'
import ('./Dashboard.scss')

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Surveys</h1>
        <div className="floating-btn"><Link to="/surveys/new">+</Link></div>
      </div>
    );
  }
}

export default Dashboard;
