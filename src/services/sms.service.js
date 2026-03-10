const AWS = require("aws-sdk");

const sns = new AWS.SNS({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

//  AWS SNS SMS INTEGRATION  src/services/sms.service.js

exports.sendSMS = async (phone, message) => {
  try {
    console.log("Sending SMS");

    await sns
      .publish({
        Message: message,
        PhoneNumber: phone,
      })
      .promise();
  } catch (error) {
    console.error("SMS Error:", error.message);
  }
};


// Send SMS for OTP, Meeting Reminders, Adoption Updates 
// writes logic to send SMS for different scenarios like OTP for login, reminders for meetings, updates on adoption status, etc.
