const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secre: true,
  auth: {
    user: "anagh9931@gmail.com",
    pass: "ecwcdkkndhcfkbai",
  },
});

const mailOptions = {
  from: "anagh9931@gmail.com",
  to: "anagh9931@yopmail.com, shanupriyanshuraj@gmail.com",
  subject: "Checking ...",
  text:
    "If you to send mail with certain message to multiple people in one click contact me...!",
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log("Email sent: " + info.response);
  }
});
