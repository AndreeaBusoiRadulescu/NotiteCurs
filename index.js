import express from 'express';
import bodyParser from 'body-parser';
import rutaUtilizator from './rute/utilizator.js';

let app = express(); //aplicatia server

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(rutaUtilizator); //notificam sa se foloseasca rutele pentru utilizator

let port = process.env.PORT || 8001;
app.listen(port); //notificam sa se foloseasca portul specificat
console.log("API is running at " + port);