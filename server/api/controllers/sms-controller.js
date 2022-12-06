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
  const id = JSON.stringify(req.params.id);
  console.log(id);
  client.messages
    .create({
      from: `${process.env.FROM_SMS}`,
      to: id,
      body: "Hey welcome to ieltstar. Thankyou for verifying your account",
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
};
