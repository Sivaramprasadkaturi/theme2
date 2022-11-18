import axios from "axios";

function getRequestParams(
  email,
  fname_val,
  lname_val,
  bname_val,
  aboutyou_val,
  phone_val,
  inquiry_val,
  country_val,
  message_val
) {
  // get env variables
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  // mailchimp datacenter - mailchimp api keys always look like this:
  // fe4f064432e4684878063s83121e4971-us6
  // We need the us6 part
  const DATACENTER = process.env.MAILCHIMP_API_KEY.split("-")[1];

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

  // Add aditional params here. See full list of available params:
  // https://mailchimp.com/developer/reference/lists/list-members/
  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: fname_val,
      LNAME: lname_val,
      BNAME: bname_val,
      ABOUTYOU: aboutyou_val,
      PHONE: phone_val,
      INQUIRY: inquiry_val,
      COUNTRY: country_val,
      MESSAGE: message_val
    }
  };

  // Api key needs to be encoded in base 64 format
  const base64ApiKey = Buffer.from(`anystring:${API_KEY}`).toString("base64");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Basic ${base64ApiKey}`
  };

  return {
    url,
    data,
    headers
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    email,
    fname_val,
    lname_val,
    bname_val,
    aboutyou_val,
    phone_val,
    inquiry_val,
    country_val,
    message_val
  } = req.body;

  if (!email || !email.length) {
    return res.status(400).json({
      error: "Forgot to add your email?"
    });
  }

  try {
    const { url, data, headers } = getRequestParams(
      email,
      fname_val,
      lname_val,
      bname_val,
      aboutyou_val,
      phone_val,
      inquiry_val,
      country_val,
      message_val
    );

    const response = await axios.post(url, data, { headers });

    // Success
    return res.status(201).json({ error: null });
  } catch (error) {
    return res.status(400).json({
      error: `Oops, something went wrong... Send me an email at uriklar@gmail.com and I'll add you to the list.`
    });

    // Report error to Sentry or whatever
  }
};
