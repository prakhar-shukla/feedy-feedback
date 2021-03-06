import React from "react";
import { withRouter } from "react-router-dom";
import { fetchSurveys } from "../../../actions";
import { connect } from "react-redux";

class SurveyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.selectedSurveyId = this.props.match.params.id;
    this.selectedSurvey = [];
  }

  componentDidMount() {
    if (!this.props.surveys.length) {
      this.props.fetchSurveys();
    }
  }

  render() {
    this.selectedSurvey = this.props.surveys.filter(survey => {
      if (survey._id === this.selectedSurveyId) {
        return survey;
      }
    });
    return (
      <div>
        <h2 className="mb-4">
          {this.selectedSurvey[0] ? this.selectedSurvey[0].title : "Loading.."}
        </h2>
        <table className="table">
          <thead>
            <tr key={this.selectedSurveyId}>
              <th>#</th>
              <th>Recipient</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRecipients(
              this.selectedSurvey[0] ? this.selectedSurvey[0].recipients : []
            )}
          </tbody>
        </table>
      </div>
    );
  }

  renderRecipients = recipients => {
    return recipients.map((recipient, index) => {
      return (
        <tr key={recipient._id}>
          <td>{index + 1}</td>
          <td>{recipient.email}</td>
          <td>
            {recipient.responded
              ? recipient.response
                ? recipient.response.toUpperCase()
                : "NA"
              : "Not Responded"}
          </td>
        </tr>
      );
    });
  };
}
function mapStateToProps(state) {
  return { surveys: state.surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(withRouter(SurveyDetails));
