const nodemailer = require("nodemailer");
// src/services/email.service.js
exports.sendPin = async (email, pin) => {
  try {
    console.log("Sending PIN Email");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your One-Time PIN",
      text: `Your PIN is ${pin}`,
    });
  } catch (error) {
    console.error("Email Error:", error.message);
  }
};


// exports.sendPasswordReset = async (email, link) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Password Reset",
//     html: `<p>Click link to reset password</p>
//            <a href="${link}">${link}</a>`,
//   });
// };

// exports.sendInvite = async (email, inviteCode) => {
//   try {
//     console.log("Sending Invite Email");


