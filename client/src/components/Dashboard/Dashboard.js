import React from "react";
import {Link} from 'react-router-dom'
import SurveyList from '../Surveys/SurveyList/SurveyList'
import ('./Dashboard.scss')

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <SurveyList/>
        <div className="floating-btn"><Link to="/surveys/new">+</Link></div>
      </div>
    );
  }
}

export default Dashboard;
