import React from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../../actions";
import { withRouter } from "react-router-dom";

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  viewSurveyDetails(surveyId) {
    this.props.history.push(`/survey/${surveyId}`);
  }

  renderSurveys() {
    var surveyList = this.props.state.surveys.reverse().map(survey => {
      return (
        <div
          className="card mb-4"
          key={survey._id}
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.viewSurveyDetails(survey._id);
          }}
        >
          <div className="card-body">
            <h5 className="card-title">{survey.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{survey.subject}</h6>
            <p className="card-text">{survey.body}</p>
            <p className="card-subtitle mb-2">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
            <a href="#" className="card-link">
              Yes Clicks : {survey.yes}
            </a>
            <a href="#" className="card-link">
              No Clicks : {survey.no}
            </a>
          </div>
        </div>
      );
    });

    console.log("SURVEY LIST", surveyList);
    return surveyList;
  }

  render() {
    return (
      <div>
        <h2>This is survey list</h2>
        <div>{this.renderSurveys()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(withRouter(SurveyList));
