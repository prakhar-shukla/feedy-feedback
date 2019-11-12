import React from "react";
import SurveyForm from "./SurveyForm/SurveyForm";
import SurveyReview from "./SurveyReview";
import { reduxForm } from "redux-form";

class SurveyNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = { formFilled: false };
  }

  renderContent() {
    if (this.state.formFilled) {
      return (
        <SurveyReview
          onCancel={() => {
            this.setState({ formFilled: false });
          }}
        />
      );
    } else {
      return (
        <SurveyForm
          onSurveySubmit={() => {
            this.setState({ formFilled: true });
          }}
        />
      );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({ form: "surveyForm" })(SurveyNew);
