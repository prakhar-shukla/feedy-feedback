module.exports = (survey,redirectionUrl) => {
  return `<div style="
          border: 1px solid #dddd;
          border-radius: 5px;
          box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
          padding: 20px;
          margin: 10px;
          ">
          <div style="
          font-size: 18px;
          margin: 0 10px 30px 10px;
          padding: 10px;
        "> ${survey.body} </div>
          <div style="padding: 10px 0;text-align: center;">
          <a href=${redirectionUrl.yesUrl} style="
          padding: 10px 20px;
          margin: 0 20px;
          background: #007bff;
          color: white;
          border: #dddd;
          border-radius: 5px;
          box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
      " id="yesBtn">Yes</a>  
          <a href=${redirectionUrl.noUrl}  style="
          padding: 10px 20px;
          margin: 0 20px;
          background: #6c757d;
          color: white;
          border: #dddd;
          border-radius: 5px;
          box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
      " id="noBtn">No</a>
      </div></div>`;
};
