import express  from 'express';
//import Atasament from '../entitati/Atasament.js';
import {creareNotita} from '../servicii/atasament.js';
import { getNotita, stergereNotita } from '../servicii/notita.js';

const router = express.Router();

router.route('/notita').post(async(req, res) => {
    return res.json(await creareNotita(req.body));
})

router.route('/notita').get( async (req, res) => {
    return res.json(await getNotita());
})

router.route('/notita/:id').delete( async (req, res) => {
    return res.json(await stergereNotita(req.params.id));
})

export default router;