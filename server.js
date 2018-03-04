const express = require("express");
const app = express();
const http = require("https");
const axios = require("axios");

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

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
  http.get(`https://www.omdbapi.com/?t=${req.params.movieName}&apikey=2b781da6`, resp => {
    let data = "";

    resp.on("data", chunk => {
      data += chunk;
    });
    resp.on("end", () => {
      var movie = JSON.parse(data);
      res.send(movie);
    });
  });
});

// app.get('/movie/poster/:moviePoster', (req, res) => {
//   axios({
//     method:'get',
//     url:`https://img.omdbapi.com/?t=${req.params.moviePoster}&apikey=2b781da6`,
//     responseType:'arraybuffer'
//   })
//     .then(function(response) {
//     var file = response.data.pipe(fs.createWriteStream('movie_poster.jpg'));
//     res.sendFile(file);
//   });
// })

app.listen(3001, () => console.log("Example app listening on port 3001!"));