import express  from 'express';
import {creareNotita} from '../servicii/notita.js';
import {getNotite} from '../servicii/notita.js';
import {getByIdNotita} from '../servicii/notita.js';
import {modificareNotita} from '../servicii/notita.js';
import {stergereNotita} from '../servicii/notita.js';


const router = express.Router(); //obtinem componenta de rutare a serverului

//inregistram rutele
router.route('/notita/:id/formular').post( async (req, res) => {
    try {
        let ret = await creareNotita(req.body);

        if (ret.hasErrors)
            res.status(400).json(ret);
        else
            res.status(201).json(ret);
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
})

router.route('/notite').get( async (req, res) => {
    try {
        let notita = await getNotite(req.params.id);

        if(notita.hasErrors)
            res.status(404).json(notita);
        else
            res.status(200).json(notita);

    } catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
})

router.route('/notita/:id').get( async (req, res) => {
    try {
        let notita = await getByIdNotita(req.params.id);

        if(notita.hasErrors)
            res.status(404).json(notita);
        else
            res.status(200).json(notita);
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }
})

router.route('/editarenotita/:id').put( async (req, res) => {
    try {
        let x = JSON.parse(req.body.Atasamente);
        // console.log("***********************");
        // console.log(x);
        req.body.Atasamente = x;
        console.log(req.body);
        let person = await  modificareNotita(req.params.id, req.body);

        if (person.hasErrors)
            res.status(400).json(person);
        else
            res.status(200).json(person);
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }  
})

router.route('/notita/:id').delete( async (req, res) => {
    try {
        let person = await stergereNotita(req.params.id);

        if (person.hasErrors)
            res.status(400).json(person);
        else
            res.status(200).json(person);
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }  
})

//facem vizibil componenta router configurata anterior
export default router;