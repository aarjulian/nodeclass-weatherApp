const path = require('path');
const express = require('express');
const hbs = require('hbs', )
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aaron Julian'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aaron Julian'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a page to find help',
        name: 'Aaron Julian'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "No address supplied to search"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return Response.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


//To catch url's not made with error messages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Aaron Julian',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aaron Julian',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
});





// app.get('/products', (req, res) => {

//     if (!req.query.search) {
//         return res.send({
//             error: "You must provide a search term"
//         })
//     }

//     res.send({
//         products: []
//     })
// })


//app.com
//app.com/help


// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Aaron'

//     }, {
//         name: 'Andrew'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<title>The Weather Application </title>' +
//         '<h1>The Weather Application </h1>')
// })