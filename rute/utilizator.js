import express  from 'express';
import Utilizator from '../entitati/Utilizator.js';
import {adaugareUtilizator} from '../servicii/utilizator.js';
import {preluareUtilizator} from '../servicii/utilizator.js';
import {preluareUtilizatorDupaId} from '../servicii/utilizator.js';
import {modificareUtilizator} from '../servicii/utilizator.js';
import {stergereUtilizator} from '../servicii/utilizator.js';


const router = express.Router(); //obtinem componenta de rutare a serverului

//inregistram rutele
router.route('/utilizator').post( async (req, res) => {
    res.json(await adaugareUtilizator(req.body));
})

router.route('/utilizator').get( async (req, res) => {
    res.json(await preluareUtilizator());
})

router.route('/utilizator/:id').get( async (req, res) => {
    res.json(await preluareUtilizatorDupaId(req.params.id));
})

router.route('/utilizator/:id').put( async (req, res) => {
    res.json(await modificareUtilizator(req.params.id, req.body));
})

router.route('/utilizator/:id').delete( async (req, res) => {
    res.json(await stergereUtilizator(req.params.id));
})

//facem vizibil componenta router configurata anterior
export default router;