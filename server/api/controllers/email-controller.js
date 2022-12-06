import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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
export const sendEmails = async (req, res) => {
  const id = JSON.stringify(req.params.id);
  console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.scores.readingScore);
  console.log(req.body.scores.writingScore);
  console.log(req.body.scores.speakingScore);
  console.log(req.body.scores.listeningScore);
  console.log(req.body.scores.overallBand);
  const options = {
    from: `${process.env.FROM_EMAIL}`,
    to: id,
    // email subject
    subject: "Ielts Test Scores",
    templateId: "d-b2de4eb090e841de8e0a207a02261464",
    dynamic_template_data: {
      email: "techgeniusk@gmail.com",
      name: "Keerthana",
      picture:
        "https://lh3.googleusercontent.com/a/AEdFTp4sRTB5MXNOZ1jhtxIPDL_khsKwdPWXDdGQ-CqOJxA=s96-c",
      scores: {
        _id: "638663ce29b99e23f2099cdf",
        testId: "2",
        readingScore: 7,
        writingScore: 9,
        speakingScore: 9,
        listeningScore: 9,
        overallBand: 7,
        testDate: "2022-12-01T03:49:56.662Z",
        id: "638663ce29b99e23f2099cdf",
      },
    },
  };
  try {
    //   send email
    // await mailer.sendMail(options);
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
