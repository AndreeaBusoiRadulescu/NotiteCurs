import express  from 'express';
import Utilizator from '../entitati/Utilizator.js';
import {adaugareUtilizator} from '../servicii/utilizator.js';
import {preluareUtilizatori} from '../servicii/utilizator.js';
import {preluareUtilizatorDupaId} from '../servicii/utilizator.js';
import {modificareUtilizator} from '../servicii/utilizator.js';
import {stergereUtilizator} from '../servicii/utilizator.js';


const router = express.Router(); //obtinem componenta de rutare a serverului

//inregistram rutele
router.route('/utilizator').post( async (req, res) => {
    let ret = await adaugareUtilizator(req.body);
    res.status(ret.code).json(ret.res);
})

router.route('/utilizator').get( async (req, res) => {
    let ret = await preluareUtilizatori();
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