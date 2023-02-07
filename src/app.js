const path = require('path')
const express = require('express')
const hbs = require('hbs') 

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const { response } = require('express')


const app = express()

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Haris Ahmad'
    })
})
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'Haris Ahmad'
    })
})
app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help Page',
        message: 'Page for help',
        name: 'Haris Ahmad'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address){
        return res.send({
            error: "You much enter an address term."
        })
    }
    
    geocode(req.query.address, (error, response, body = {}) => {
        if (error){
            return res.send({error})
        }

        const location = body.features[0].center

        forecast(req.query.address, (error, response, body) => {
            if (error){
                return res.send({error})
            }
            res.send({location, weather: "It is currently "+ body.current.temperature+ " degrees. It feels like "+ body.current.feelslike+ "."})
        })
    })
    
    
})
app.get('/products', (req, res) =>{
    if (!req.query.search){
        return res.send({
            error: "You much enter a search term"
        })
    }
    console.log(req.query.search)
    res.send({products: []})
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: "404",
        error_message: 'Help article not found.',
        name: 'Haris Ahmad'
    })
})
app.get('/*', (req,res)=>{
    res.render('404', {
        title: "404",
        error_message: 'Page not found.',
        name: 'Haris Ahmad'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})