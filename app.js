require('dotenv').config();
const express = require("express");
const busboyBodyParser = require('busboy-body-parser');
const app = express();
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require('fs');



app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(busboyBodyParser({ multi: false }));


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});


const smtpTransport = nodemailer.createTransport({
  host: "mail.rickheffren.com",
  port: 465,
  secure: true, // use TLS

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  tls: {rejectUnauthorized: false}
});

// smtpTransport.verify(function(error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });


app.route("/")
.get((req, res) => {
  res.render("index");
});

app.get("/questionnaire", (req, res) => {
  res.render("questionnaire");
});

app.post("/005312", (req,res) => {
  let qdata = req.body;
  let questions = [];

  let passData = {
    name: qdata.name,
    email: qdata.email,
      questions: [
      {q: "Tell me about your perfect website...", a: qdata.q1},
      {q: "Are we building this website for a business or is it more of a personal site?  Tell me about what you do..", a: qdata.q2},
      {q: "What specific services do you provide and who is your target audience?", a: qdata.q3},
      {q: "Is there something that sets your offerings appart from any competing offerings?", a: qdata.q4},
      {q: "Do you currently have a website?  If so why do you want a new one and what do you love/dislike about your current site?", a: qdata.q5},
      {q: "What keywords will your target audience use to find your website?", a: qdata.q6},
      {q: "What similar sites do you like and what do you like about them?", a: qdata.q7},
      {q: "What features will your website need?", a: qdata.q8},
      {q: "Do you have a logo and or branding?  Will you need a new URL?", a: qdata.q9},
      {q: "Would you like me to handle hosting and maintenance?", a: qdata.q10}
    ]
  };

  passData.questions.forEach((each) => {
    if (each.a) {questions.push(each)};
  });

  passData.questions = questions;

  passData.questions.forEach((each) =>  {
    console.log("This is the passData: " + JSON.stringify(each));
  });
  ejs.renderFile(__dirname + "/views/email.ejs", {data: passData}, function (err, data) {
    if (err) {
        console.log(err);
    } else {
      const mailOptions = {
           from: process.env.EMAIL,
           to: passData.email,
           subject: "Wesite design inquiry",
           html: data
      };
      smtpTransport.sendMail(mailOptions, function (err, info) {
          if (err) {
              console.log(err);
          } else {
              console.log('Message sent: ' + info.response);
          }
          smtpTransport.close();
      });
    }
  });
});
