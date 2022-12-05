import Twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = `${process.env.AccountSID}`;
const authToken = `${process.env.AuthToken}`;

const client = Twilio(accountSid, authToken);
// set status and send response
const setResponse = (res, status, data) => {
  res.status(status).json(data);
};

// get all sms
export const sendSms = (req, res) => {
  //   const id = request.params.id;
  // const questions = await questionsService.get(id);
  //   send email
  client.messages
    .create({
      body: "Hey welcome to ieltstar. Thankyou for verifying your account",
      from: `${procss.env.FROM_SMS}`,
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
