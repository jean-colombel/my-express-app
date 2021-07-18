// Old way

// const http = require('http');

// http.createServer((_, res) => {
//   res.write('My NODEJS Server is live!');
//   res.end();
// }).listen(4040);

// with Express

// in terminal run 'npm install ejs' -> Template engine
// in terminal run 'npx nodemon app.js' -> To run the server and enable auto-rendering
//                                         when the file is modified.

const express = require('express');
const app = express();
const path = require('path')

app.use(express.urlencoded({extended: false}))
// app.use(getWeather)
app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, 'views'))

const port = process.env.PORT || 4041;

function getWeather(req, res, next) {
  req.visitorWeather = false
  if (req.visitorWeather) {
    res.send("Please come back when its not raining")
  } else {
    next()
  }
}

app.get('/', getWeather, (req, res) => {
  res.render("home", {
    isRaining: req.visitorWeather,
    pets: [{name: 'Elvis', species: 'dog'}, {name: 'Chatus', species: 'cat'}]
  })
})

app.get('/about', (req, res) => {
  res.send("About page")
})

app.post('/result', (req, res) => {
  if (req.body.color.trim().toLowerCase() === 'blue') {
    res.send('Congrats.')
  } else {
    res.send('Incorrect.')
  }
})

app.get('/api/pets', (req, res) => {
  res.json({
    isRaining: req.visitorWeather,
    pets: [{ name: 'Elvis', species: 'dog' }, { name: 'Chatus', species: 'cat' }]
  })
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
