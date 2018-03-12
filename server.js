const express = require("express");
const app = express();
const router = express.Router();
const http = require("https");
const axios = require("axios");
const nodemailer = require("nodemailer");

require('dotenv').config();

app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get('/', function (req, res) {
  res.send('GET request');
})

app.get("/movies", (req, res) => {
  axios.get('https://www.eventcinemas.co.nz/Movies/GetNowShowing')
    .then(function (response) {
      res.send(response.data.Data.Movies)
    })
    .catch(function (error) {
      console.log(error);
    })
});

app.get('/movie/:movieName', (req, res) => {
  axios.get(`https://www.omdbapi.com/?t=${req.params.movieName}&apikey=2b781da6`)
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
});

app.get('/email', function (req, res) {
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    secure: false,
    port: 25,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS 
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECIPIENT,
    subject: "Email from movie app",
    text: "Hello from movie app"
  }

  console.log(mailOptions);
  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Email was sent.");
      res.end("sent");
    }
  })
})

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});