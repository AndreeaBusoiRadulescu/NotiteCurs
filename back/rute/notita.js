import express  from 'express';
import Notita from '../entitati/Notita.js';
import {creareNotita} from '../servicii/notita.js';
import {getNotita} from '../servicii/notita.js';
import {getByIdNotita} from '../servicii/notita.js';
import {modificareNotita} from '../servicii/notita.js';
import {stergereNotita} from '../servicii/notita.js';


const router = express.Router(); //obtinem componenta de rutare a serverului

//inregistram rutele
router.route('/formularnotita').post( async (req, res) => {
    let ret = await creareNotita(req.body);
    res.status(ret.code).json(ret.res);
})

router.route('/notita').get( async (req, res) => {
    res.json(await getNotita());
})

router.route('/notita/:id').get( async (req, res) => {
    res.json(await getByIdNotita(req.params.id));
})

router.route('/notita/:id').put( async (req, res) => {
    res.json(await modificareNotita(req.params.id, req.body));
})

router.route('/notita/:id').delete( async (req, res) => {
    res.json(await stergereNotita(req.params.id));
})

//facem vizibil componenta router configurata anterior
export default router;