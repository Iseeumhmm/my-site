require('dotenv').config();
const express = require("express");
const busboyBodyParser = require('busboy-body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(busboyBodyParser({ multi: false }));



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});






app.route("/")
.get((req, res) => {
  res.render("index");
});

app.get("/questionnaire", (req, res) => {
  res.render("questionnaire");
});

app.post("/005312", (req,res) => {

});
