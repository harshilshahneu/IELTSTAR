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
  const options = {
    from: `${process.env.FROM_EMAIL}`,
    to: id,
    // email subject
    subject: "Ielts Test Scores",
    templateId: "d-b2de4eb090e841de8e0a207a02261464",
    dynamic_template_data: {
      email: req.body.email,
      name: req.body.name,
      picture: req.body.picture,
      scores: {
        readingScore: req.body.scores.readingScore,
        writingScore: req.body.scores.writingScore,
        speakingScore: req.body.scores.speakingScore,
        listeningScore: req.body.scores.listeningScore,
        overallBand: req.body.scores.overallBand,
      },
    },
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
