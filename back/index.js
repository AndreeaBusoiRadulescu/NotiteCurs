import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './dbConfig.js';
import rutaUtilizator from './rute/utilizator.js';
import rutaNotita from './rute/notita.js';
import Utilizator from './entitati/Utilizator.js';
import Notita from './entitati/Notita.js';
import Atasament from './entitati/Atasament.js';


let app = express(); //aplicatia server

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

Utilizator.hasMany(Notita, {as: "Notite", foreignKey: "UtilizatorId"});
Notita.belongsTo(Utilizator, {foreignKey: "UtilizatorId"});

Notita.hasMany(Atasament, {as: "Atasamente", foreignKey: "IdNotita"});
Atasament.belongsTo(Notita, {foreignKey: "IdNotita"});


//testam daca se poate efectua conexiunea cu baza de date
sequelize
    .authenticate()
    .then(() => {
        console.log("Conexiunea cu baza de date s-a realizat cu succes!");
    })
    .catch(err => {
        console.log("Nu se poate realiza conexiunea cu baza de date: " , err);
    })

//TEST ONE TO MANY (UTILIZATOR <=> NOTITE. UN UTILIZATOR ARE MAI MULTE NOTITE. O NOTITA APARTINE UNUI SINGUR UTILIZATOR)

// let notita = await Notita.create({Materie: 'Materie', UtilizatorId: 111, Continut: 'Blablabla'});
// console.log(notita);

// let user = await Utilizator.findByPk(111);
// let notite_user = await user.getNotite();
// console.log("****Notitele utilizatorului: ****");
// console.log(notite_user);

//



//TEST ONE TO MANY (ATASAMENTE <=> NOTITA. O NOTITA ARE MAI MULTE ATASAMENTE. UN ATASAMENT APARTINE UNEI SINGURE NOTITE)

// let notita = await Notita.create({Materie: 'Materie2', UtilizatorId: 100, Continut: 'AAAAAAAA'});
// let atasament = await Atasament.create({IdNotita: notita.IdNotita, SursaAtasament: "Sursa atasament!"});

// console.log(notita);

// let user = await Utilizator.findByPk(100);
// let notite_user = await Notita.findAll(
//     {
//         where: 
//         {
//             UtilizatorId: 100
//         }, 
//         include: 
//         {
//             model: Atasament,
//             as: "Atasamente"
//         }
//     }
// );

// console.log("****Notitele utilizatorului: ****");
// console.log(notite_user);

//

app.use(rutaUtilizator); //notificam sa se foloseasca rutele pentru utilizator
app.use(rutaNotita);

let port = process.env.PORT || 8001;
app.listen(port); //notificam sa se foloseasca portul specificat
console.log("API is running at " + port);

