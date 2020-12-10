import sequelize from '../dbConfig.js';
import Utilizator from '../entitati/Utilizator.js';
import bcrypt from 'bcrypt';
import Notita from '../entitati/Notita.js';

//adaugare un utilizator nou
export async function adaugareUtilizator(utilizator){
    await Utilizator.create(utilizator, {
        include: [
            {model: Notita, as: "Notite"}
        ]});
}

export async function preluareUtilizator(){
    return await Utilizator.findAll();
}

export async function preluareUtilizatorDupaId(id){
    return await Utilizator.findByPk(id);
}

export async function modificareUtilizator(id, utilizator){
    if (parseInt(id) !== utilizator.UtilizatorId){
        console.log("Id ul utilizatorului nu corespunde cu id-ul introdus");
        return;
    }

    let updateEntity = await preluareUtilizatorDupaId(id);

    if (!updateEntity)
    {
        console.log("Nu exista utilizator cu acest id");
        return;
    }

    return await updateEntity.update(utilizator);
}

export async function stergereUtilizator(id){
    
    let deleteEntity = await preluareUtilizatorDupaId(id);

    if (!deleteEntity)
    {
        console.log("Magazinul nu are id-ul specificat");
        return;
    }

    return await deleteEntity.destroy();
}