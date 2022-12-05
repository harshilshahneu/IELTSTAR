import Twilio from "twilio";

const accountSid = `${process.env.AccountSID}`;
const authToken = `${process.env.AuthToken}`;

const client = Twilio(accountSid, authToken);
// set status and send response
const setResponse = (res, status, data) => {
  res.status(status).json(data);
};

// get all exams
export const getExams = (req, res) => {
  //   send email
  client.messages
    .create({
      body: "Hey welcome to ieltstar. Thankyou for verifying your account",
      from: "+16506643056",
      to: "+15513318177",
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
};

/**
 * Post API request method
 * @param {*} request
 * @param {*} response
 */
export const post = async (request, response) => {
  try {
    const payload = request.body;
    const questions = await questionsService.save(payload);
    setSuccessResponse(questions, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};
