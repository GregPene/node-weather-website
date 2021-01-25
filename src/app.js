const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Greg'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Greg'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Greg',
        helpText: 'This is a Help Text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address parameter'
        })
    }

//    console.log(req.query.address)

    geocode (req.query.address, (error,  { latitude, longitude, location } = {}) => {
        // if (error) {
        //     return res.send({ error })
        // }
            forecast (latitude, longitude,  (error, forecastData) => {
            // if (error) {
            //     return res.send({ error })
            // }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address    
            })
        })    
    })
})

app.get('/products', (req, res) => {
    if (!req.query.key1) {
        return res.send({
            error: 'You must provide a key1 parameter'
        })
    }

    console.log(req.query.key1)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('pagenotfound', {
        title: 'Help 404',
        name: 'Greg P',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('pagenotfound', {
        title: '404',
        name: 'Greg P',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port+'.')
})
