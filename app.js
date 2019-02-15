require('dotenv').config();
const express = require("express");
const busboyBodyParser = require('busboy-body-parser');
const app = express();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(busboyBodyParser({ multi: false }));

const oauth2Client = new OAuth2(
     process.env.CLIENT_ID, // ClientID
     process.env.CLIENT_SECRET, // Client Secret
     "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
     refresh_token: process.env.REFRESH_TOKEN
});
const tokens = oauth2Client.getAccessToken().then(res => res.token);



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});


const smtpTransport = nodemailer.createTransport({
     service: "gmail",
     auth: {
          type: "OAuth2",
          user: process.env.EMAIL,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: tokens
     }
});

const mailOptions = {
     from: "iseeumhmm@gmail.com",
     to: "rheffren@gmail.com",
     subject: "Node.js Email with Secure OAuth",
     generateTextFromHTML: true,
     html: "<b>test</b>"
};

smtpTransport.sendMail(mailOptions, (error, response) => {
     error ? console.log(error) : console.log(response);
     smtpTransport.close();
});



app.route("/")
.get((req, res) => {
  res.render("index");
});

app.get("/questionnaire", (req, res) => {
  res.render("questionnaire");
});

app.post("/005312", (req,res) => {
  console.log("This is the formData on server side: " + JSON.stringify(req.body));
  res.send("got it");
});
