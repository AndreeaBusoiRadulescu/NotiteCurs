import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './dbConfig.js';
import rutaUtilizator from './rute/utilizator.js';
import Notita from './entitati/Notita.js';
import Utilizator from './entitati/Utilizator.js';
//import rutaNotita from './rute/notita.js';

let app = express(); //aplicatia server

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//testam daca se poate efectua conexiunea cu baza de date
sequelize
    .authenticate()
    .then(() => {
        console.log("Conexiunea cu baza de date s-a realizat cu succes!");
    })
    .catch(err => {
        console.log("Nu se poate realiza conexiunea cu baza de date: " , err);
    })

  Utilizator.hasMany(Notita, {as: "Notite", foreignKey: "UtilizatorId"});
  Notita.belongsTo(Utilizator, {foreignKey: "UtilizatorId"});



app.use(rutaUtilizator); //notificam sa se foloseasca rutele pentru utilizator

let port = process.env.PORT || 8001;
app.listen(port); //notificam sa se foloseasca portul specificat
console.log("API is running at " + port);

