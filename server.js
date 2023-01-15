const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const https = require('https')


app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, function() {
    console.log('listening on port: ' + port)
})

app.get('/', function(req, res) {


    res.sendFile(__dirname + "\\index.html")


})

app.post("/", function(req, res) {



    const query = req.body.cityName
    console.log(query)
    const apiKey = "73214348efd118531ea37f51b45d17b9"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric"

    https.get(url, function(response) {
        console.log(response.statusCode)

        response.on('data', function(data) {

            const weatherData = JSON.parse(data)
            const cod = weatherData.cod
            console.log(weatherData)

            if (cod < 250) {

                const temp = weatherData.main.temp
                const weather = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
                const city = weatherData.name


                res.write("<h1>The Temperature of " + city + " is " + temp + " degree celsius </h1>")
                res.write("<p>The weather is currently " + weather + "</p>")
                res.write('<img src="' + iconUrl + '"></img>')

                res.send()
            } else {
                const msg = weatherData.message
                res.write("<h1>cod error: " + cod + "</h1>")
                res.write('<p>reasons: ' + msg + ' return  ' + '</p>')
                res.send()

            }
        })

    })



})





//app.get('/result', function(req, res) {
//     res.sendFile(__dirname + "/result.html")

// });