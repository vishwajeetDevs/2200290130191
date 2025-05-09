const axios = require("axios");

let token = null;
let expiry = null;

async function getToken() {
  const now = new Date();
  if (token && expiry && now < expiry) {
    return token;
  }

  const response = await axios.post("http://20.244.56.144/evaluation-service/auth", {
    companyName: "Affordmed",
    clientID: "aVQxdS",
    clientSecret: "YtNHJL",
    ownerName: "Vishwajeet Singh",
    ownerEmail: "vishwajeet@example.com",
    rollNo: "2200290130191",
  });

  token = response.data.access_token;
  expiry = new Date(now.getTime() + 9 * 60 * 1000); // valid for 9 mins
  return token;
}

module.exports = { getToken };
