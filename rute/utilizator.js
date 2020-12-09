import express  from 'express';
import Utilizator from '../entitati/Utilizator.js';
import {adaugareUtilizator} from '../servicii/utilizator.js';

const router = express.Router(); //obtinem componenta de rutare a serverului

//inregistram rutele
router.route('/utilizator').post( async (req, res) => {
    res.json(await adaugareUtilizator(req.body));
})

//facem vizibil componenta router configurata anterior
export default router;