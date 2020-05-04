const path = require('path');
const express = require('express');
// This is required for partials and not required for rendering views
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();

// Path to configure express
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(publicDirectoryPath, '../templates/views');
const partialsPath = path.join(publicDirectoryPath, '../templates/partials');

// Configure express to use handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Configure express for serving static contents
app.use(express.static(publicDirectoryPath));

// Path mapping for root page
app.get('',(req, res) => {
    res.render('index',{
        name: "Deepak Khetan",
        title: "Weather"
    });
});

// Path mapping for about page
app.get('/about',(req, res) => {
    res.render('about',{
        name: "Deepak Khetan",
        title: "About"
    });
});

// Path mapping for help page
app.get('/help',(req, res) => {
    res.render('help',{
        title: "Help",
        message: "Find all required help here",
        name: "Deepak Khetan"
    });
});

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        });
    }

    geocode.geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if(error){
            console.log(error);
            return res.send({error});
        }
        weather.forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });   
});

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: "Deepak Khetan",
        errorMessage: "Help article not found"
    })
});

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: "Deepak Khetan",
        errorMessage: "Page Not Found"
    })
});

app.listen(3000, () => {
    console.log('Express app server is now listening on port 3000');
});