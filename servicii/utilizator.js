import sequelize from '../dbConfig.js';
import Utilizator from '../entitati/Utilizator.js';
import bcrypt from 'bcrypt';
//import Notita from '../entitati/Notita.js';

//adaugare un utilizator nou
 export async function adaugareUtilizator(utilizator){
   return {
       code : 201,
       res : await Utilizator.create(utilizator)
   }
}

export async function preluareUtilizatori(){
    return{
        code : 200,
        res : await Utilizator.findAll()
    } 
}

export async function preluareUtilizatorDupaId(id){
    let getEntity = await Utilizator.findByPk(id);

    if (!getEntity)
    {
        return{
            code : 404,
            res :  "Elementul cu id-ul cautat nu exista"
        }
    }

    return {
        code: 200,
        res : getEntity
    }
}

export async function modificareUtilizator(id, utilizator){
    if (parseInt(id) !== utilizator.UtilizatorId){
        return {
            code: 400,
            res : "Id ul utilizatorului nu corespunde cu id-ul introdus"
        }
    }

    let updateEntity = (await preluareUtilizatorDupaId(id)).res;

    if (!updateEntity)
    {
        return {
            code: 404,
            res : "Nu exista utilizator cu acest id"
        }
    }

    return {
        code : 200,
        res : await updateEntity.update(utilizator)
    }
}

export async function stergereUtilizator(id){
    
    let deleteEntity = await Utilizator.findByPk(id);

    if (!deleteEntity)
    {
        return{
            code : 404,
            res :  "Elementul nu exista, deci nu poate fi sters"
        }
    }
    //try{
        return {
            code : 200,
            res : await deleteEntity.destroy()
        }
    /*}catch(e){
        let mesaj = "Aceasta entitate este folosita deja, deci nu poate fi stearsa"
        if(e.mesaj.includes("FK_Notita_Utilizator")){
            console.log(mesaj);
            return mesaj;
        }
        else
            throw(e);
    }*/
}