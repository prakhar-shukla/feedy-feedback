import React from "react";

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.checkOutForm = React.createRef();
  }
  initiatePayment = async () => {
    console.log(this.props);
    const reqObj = { amount: this.props.amount };
    const node = this.checkOutForm;
    //node.current.submit();
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <form name="paytm-checkout" action="/api/payment/checkout" method="post">
          <input type="hidden" name="amount" value={this.props.amount} />
          <button type="submit" className="btn btn-primary">
            Pay Now
          </button>
        </form>
      </div>
    );
  }
}

export default Payment;
