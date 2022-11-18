const { google } = require("googleapis");
const keys = require("./keys.json");
const sheets = google.sheets("v4");

const getTheDataFromSpreadSheet = async lang => {
  const authClient = await authorize();
  const request = {
    spreadsheetId: "1vAKZ4rUPgYHsM93BY9395d6R1WC2okKm6ORsaQP8RjA",
    range: `${lang}!A2:B20000`,
    auth: authClient
  };
  try {
    return (await sheets.spreadsheets.values.get(request)).data;
  } catch (error) {
    console.error(error);
  }
};

const authorize = async () => {
  let authClient = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    null
  );
  if (authClient == null) {
    throw new Error("authentication failed");
  }
  return authClient;
};

module.exports = {
  getTheDataFromSpreadSheet
};
