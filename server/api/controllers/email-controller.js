import nodemailer from "nodemailer";

const mailer = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: "apikey",
    pass: `${process.env.SENDGRID_APIKEY}`,
  },
});

// set status and send response
const setResponse = (res, status, data) => {
  res.status(status).json(data);
};

// get all exams
export const getExams = async (req, res) => {
  const options = {
    from: "keerthanasatheesh21@gmail.com",
    to: "techgeniusk@gmail.com",
    // email subject
    subject: "Sending Email Test",
    // email content
    html: `<div style="text-align: center;"><h1>Hello Keerthana</h1></div>
             `,
  };
  try {
    //   send email
    await mailer.sendMail(options);
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    //   error handling
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

// exports.sendEmail = async (req, res) => {
//   const { name, email } = req.body;
//   const options = {
//     from: "lnu.ke@northeastern.edu",
//     to: "techgeniusk@gmail.com",
//     // email subject
//     subject: "Sending Email Test",
//     // email content
//     html: `<div style="text-align: center;"><h1>Hello ${name}</h1></div>
//      `,
//   };
//   try {
//     //   send email
//     await mailer.sendMail(options);
//     res.status(200).json({
//       message: "success",
//     });
//   } catch (error) {
//     //   error handling
//     console.log(error);
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// };

// transporter.sendMail(
//   {
//     from: "lnu.ke@northeastern.edu", // verified sender email
//     to: "techgeniusk@gmail.com", // recipient email
//     subject: "Test message subject", // Subject line
//     text: "Hello world!", // plain text body
//     html: "<b>Hello world!</b>", // html body
//   },
//   function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   }
// );
