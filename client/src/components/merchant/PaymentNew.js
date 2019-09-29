//Shows Store and BillingForm and PaymentForm
import _ from "lodash";
import React, { Component } from "react";
import Store from "./Store";
import BillingForm from "./BillingForm";
import PaymentForm from "./PaymentForm";
import HorizontalStepper from "../util/HorizontalStepper";

class PaymentNew extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    const formValues = {};

    this.state = Object.assign({ formStage: 0 }, { formValues });
  }

  renderContent() {
    if (this.state.formStage === 2) {
      return (
        <PaymentForm
          formValues={this.state.formValues}
          onCancel={() => {
            this.setState({ formStage: 1 });
            this.gotoPreviousStage();
          }}
        />
      );
    }

    if (this.state.formStage === 1) {
      return (
        <BillingForm
          formValues={this.state.formValues}
          onCancel={() => {
            this.setState({ formStage: 0 });
            this.gotoPreviousStage();
          }}
          onSurveySubmit={fields => {
            const formValues = Object.assign(this.state.formValues, fields);
            this.setState(Object.assign({ formStage: 2 }, { formValues }));
            this.gotoNextStage();
          }}
        />
      );
    }

    //if (this.state.formStage === 0)
    return (
      <Store
        formValues={this.state.formValues}
        onSurveySubmit={product => {
          const formValues = this.state.formValues;
          formValues.product = product;
          this.setState(Object.assign({ formStage: 1 }, { formValues }));
          this.gotoNextStage();
        }}
      />
    );
  }

  gotoNextStage() {
    this.refs.horizontalStepper.gotoNextStage();
  }

  gotoPreviousStage() {
    this.refs.horizontalStepper.gotoPreviousStage();
  }

  render() {
    return (
      <div>
        <HorizontalStepper
          ref="horizontalStepper"
          stages={[
            { title: "Select Product", optional: "Required" },
            { title: "Billing Info", optional: "Required" },
            { title: "Payment", optional: "Required" }
          ]}
        />

        {this.renderContent()}
      </div>
    );
  }
}

export default PaymentNew;