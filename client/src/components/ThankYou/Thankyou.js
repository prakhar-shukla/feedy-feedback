import React from "react";

class Thankyou extends React.Component {
  componentWillMount = () => {
    console.log(
      "LOCATION",
      this.getQueryStringParams(this.props.location.search)
    );
    this.queryParams = {};
    if (this.props.location.search) {
      this.queryParams = this.getQueryStringParams(this.props.location.search);
    }
    this.transactionResult = this.getTransactionResult(this.queryParams);
  };
  getTransactionResult = response => {
    switch (response.RESPCODE) {
      case "01": {
        return true;
      }
      default:
        return false;
    }
  };
  getQueryStringParams = query => {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split("&")
          .reduce((params, param) => {
            let [key, value] = param.split("=");
            params[key] = value
              ? decodeURIComponent(value.replace(/\+/g, " "))
              : "";
            return params;
          }, {})
      : {};
  };

  render() {
    return this.transactionResult ? (
      <div>
        <h1>Thankyou for your purchase</h1>
        <h3>TXNID</h3>
        <p>{this.queryParams.TXNID}</p>
        <h3>TXNAMOUNT</h3>
        <p>{this.queryParams.TXNAMOUNT}</p>
        <h3>STATUS</h3>
        <p>{this.queryParams.STATUS}</p>
        <h3>RESPCODE</h3>
        <p>{this.queryParams.RESPCODE}</p>
        <h3>TXNDATE</h3>
        <p>{this.queryParams.TXNDATE}</p>
      </div>
    ) : (
      <div>
        <h2>Sorry! The transaction was failed</h2>
        <p>{this.queryParams.RESPMSG}</p>
      </div>
    );
  }
}

export default Thankyou;
