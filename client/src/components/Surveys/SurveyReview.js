import React from "react";
import { connect } from "react-redux";
import * as action from "../../actions";
import { withRouter } from "react-router-dom";

class SurveyReview extends React.Component {
  render() {
    return (
      <div>
        <h2>Review Your Entries</h2>
        <div style={{marginTop:"20px",marginBottom:"20px"}} className="row">
          <div className="col-md-6 col-sm-12 col-xs-12">
            <label>Survey Title</label>
            <div>{this.props.formValues.title}</div>
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12">
            <label>Subject Line</label>
            <div>{this.props.formValues.subject}</div>
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12">
            <label>Email Body</label>
            <div>{this.props.formValues.body}</div>
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12">
            <label>Recipients List</label>
            <div>{this.props.formValues.recipients}</div>
          </div>
        </div>
        <button
          name="cancelBtn"
          className="btn btn-secondary float-left"
          onClick={this.props.onCancel}
        >
          Back
        </button>
        <button
          name="cancelBtn"
          className="btn btn-primary float-right"
          onClick={()=>{this.props.sendSurvey(this.props.formValues,this.props.history)}}
        >
          Send Survey
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.form.surveyForm.values);
  return {formValues:state.form.surveyForm.values||{}};
}

export default connect(mapStateToProps,action)(withRouter(SurveyReview));
