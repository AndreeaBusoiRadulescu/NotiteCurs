import express  from 'express';
import {
    adaugareUtilizator, 
    preluareUtilizatorLogin,
    preluareUtilizatori, 
    preluareUtilizatorDupaId, 
    stergereUtilizator, 
    modificareUtilizator 
} from '../servicii/utilizator.js';

import {
    preluareNotiteDupaIdUtilizator
} from '../servicii/notita.js';

const router = express.Router(); //obtinem componenta de rutare a serverului

router.route('/utilizator/:idUtilizator/notite').get(async (req, res) =>{
    let ret = await preluareNotiteDupaIdUtilizator(req.params.idUtilizator);
    res.status(ret.code).json(ret.res);
})

//inregistram rutele
router.route('/utilizator').post( async (req, res) => {
    //console.log("A venit cu: " + req.body.EmailAddress);
    let ret = await adaugareUtilizator(req.body);
    res.status(ret.code).json(ret.res);
})


router.route('/utilizator').get( async (req, res) => {
    let ret = await preluareUtilizatori();
    res.status(ret.code).json(ret.res);
})

// /login?email=ceva@stud.ase.ro&password=44444
router.route('/login').get( async (req, res) => {
    console.log(req.query);
    let ret = await preluareUtilizatorLogin(req.query.email, req.query.password);
    res.status(ret.code).json(ret.res);
})

router.route('/utilizator/:id').get( async (req, res) => {
    let ret = await preluareUtilizatorDupaId(req.params.id);
    res.status(ret.code).json(ret.res);
})

router.route('/utilizator/:id').put( async (req, res) => {
    let ret = await modificareUtilizator(req.params.id, req.body);
    res.status(ret.code).json(ret.res);
})

router.route('/utilizator/:id').delete( async (req, res) => {
    let ret = await stergereUtilizator(req.params.id);
    res.status(ret.code).json(ret.res);
})

//facem vizibil componenta router configurata anterior
export default router;