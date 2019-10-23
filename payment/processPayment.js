const https = require("https");
const checksum_lib = require("./checksum.js");
const keys = require("../config/keys");

var PaytmConfig = {
  mid: keys.paytmMerchantId,
  key: keys.paytmMerchantKey,
  website: keys.paytmWebsite,
  orderInitialId: keys.paytmOrderInitialId,
  transactionUrl: keys.paytmTransactionUrl,
  paytmHostName: keys.paytmHostName,
  paytmCallbackUrl: keys.paytmCallbackUrl,
  clientRedirectionBaseUrl: keys.clientRedirectionBaseUrl,
  clientSuccessPageUrl: "/thankyou"
};

function initiatePayment(app, req, res) {
  var params = {};
  params["MID"] = PaytmConfig.mid;
  params["WEBSITE"] = PaytmConfig.website;
  params["CHANNEL_ID"] = "WEB";
  params["INDUSTRY_TYPE_ID"] = "Retail";
  params["ORDER_ID"] = PaytmConfig.orderInitialId + "" + new Date().getTime();
  params["CUST_ID"] = req.user.userId;
  params["TXN_AMOUNT"] = req.body.amount;
  params["CALLBACK_URL"] = PaytmConfig.paytmCallbackUrl;
  (params["EMAIL"] = req.user.emails[0].value), (params["MOBILE_NO"] = "");

  console.log("KEYS", PaytmConfig);
  console.log("PARAMS", params);

  checksum_lib.genchecksum(params, PaytmConfig.key, function(err, checksum) {
    var txn_url = PaytmConfig.transactionUrl;

    var form_fields = "";
    for (var x in params) {
      form_fields +=
        "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
    }
    form_fields +=
      "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

    var payment_form =
      '<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' +
      txn_url +
      '" name="f1">' +
      form_fields +
      '</form><script type="text/javascript">document.f1.submit();</script></body></html>';
    res.send(payment_form);
  });
}

function verifyPaymentStatus(app, req, res) {
  var body = req.body;
  var html = "";
  var post_data = body;
  // received params in callback
  console.log("Callback Response: ", post_data, "\n");
  html += "<b>Callback Response</b><br>";
  for (var x in post_data) {
    html += x + " => " + post_data[x] + "<br/>";
  }
  html += "<br/><br/>";
  // verify the checksum
  var checksumhash = post_data.CHECKSUMHASH;
  // delete post_data.CHECKSUMHASH;
  var result = checksum_lib.verifychecksum(
    post_data,
    PaytmConfig.key,
    checksumhash
  );
  console.log("Checksum Result => ", result, "\n");
  html += "<b>Checksum Result</b> => " + (result ? "True" : "False");
  html += "<br/><br/>";
  // Send Server-to-Server request to verify Order Status
  var params = { MID: PaytmConfig.mid, ORDERID: post_data.ORDERID };
  checksum_lib.genchecksum(params, PaytmConfig.key, function(err, checksum) {
    params.CHECKSUMHASH = checksum;
    post_data = "JsonData=" + JSON.stringify(params);
    var options = {
      hostname: PaytmConfig.paytmHostName,
      port: 443,
      path: "/merchant-status/getTxnStatus",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": post_data.length
      }
    };
    // Set up the request
    var response = "";
    var post_req = https.request(options, function(post_res) {
      post_res.on("data", function(chunk) {
        response += chunk;
      });
      post_res.on("end", function() {
        console.log("S2S Response: ", response, "\n");
        var _result = JSON.parse(response);
        html += "<b>Status Check Response</b><br>";
        for (var x in _result) {
          html += x + " => " + _result[x] + "<br/>";
        }
        var redirectionUrl =
          PaytmConfig.clientRedirectionBaseUrl +
          PaytmConfig.clientSuccessPageUrl;
        redirectionUrl += "?TXNID=" + _result.TXNID + "&";
        redirectionUrl += "TXNAMOUNT=" + _result.TXNAMOUNT + "&";
        redirectionUrl += "STATUS=" + _result.STATUS + "&";
        redirectionUrl += "RESPCODE=" + _result.RESPCODE + "&";
        redirectionUrl += "TXNDATE=" + _result.TXNDATE + "&";
        redirectionUrl += "RESPMSG=" + _result.RESPMSG;

        //Update User credits in mongo db
        if (_result.RESPCODE === "01") {
          req.user.credits += parseInt(_result.TXNAMOUNT);
          req.user.save();
        }

        res.redirect(redirectionUrl);
      });
    });
    // post the data
    post_req.write(post_data);
    post_req.end();
  });
}

module.exports.initiatePayment = initiatePayment;
module.exports.verifyPaymentStatus = verifyPaymentStatus;
