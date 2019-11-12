import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import {Link} from 'react-router-dom'
import "./SurveyForm.scss"

class SurveyForm extends React.Component {
  renderFields() {
    return (
      <div style={{marginTop:"20px",marginBottom:"20px"}} className="row">
        <Field
          label="Survey Title"
          type="text"
          name="title"
          component={SurveyField}
        />
        <Field
          label="Subject Line"
          type="text"
          name="subject"
          component={SurveyField}
        />
        <Field
          label="Survey Body"
          type="text"
          name="body"
          component={SurveyField}
        />
        <Field
          label="Recipient List"
          type="email"
          name="recipients"
          component={SurveyField}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Survey Form</h2>
        <form
          onSubmit={this.props.handleSubmit(values => {
            console.log(values);
            this.props.onSurveySubmit();
          })}
        >
          {this.renderFields()}
          <Link to="/dashboard" className="btn btn-secondary float-left">Cancel</Link>
          <button type="submit" name="surveySubmit" className="btn btn-primary float-right">
            Next
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: "surveyForm" ,destroyOnUnmount:false})(SurveyForm);
