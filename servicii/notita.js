import sequelize from '../dbConfig.js';
import bcrypt from 'bcrypt';
import Notita from '../entitati/Notita.js';

//adaugare o notita noua
export async function creareNotita(notita){
   await Notita.create(notita);
}

export async function getByIdNotita(id){
    return await Notita.findByPk(id);
}

export async function getNotita(){
    return await Notita.findAll();
}

export async function modificareNotita(id, notita){
    if (parseInt(id) !== notita.IdNotita){
        console.log("Entitatea este diferita de cea cu id-ul introdus");
        return;
    }

    let updateEntity = await getByIdNotita(id);

    if (!updateEntity)
    {
        console.log("Nu exista notita cu acest id");
        return;
    }

    return await updateEntity.update(notita);s
}

export async function stergereNotita(id){
    
    let deleteEntity = await getByIdNotita(id);

    if (!deleteEntity)
    {
        console.log("Elementul nu exista, deci nu poate fi sters");
        return;
    }
        return await deleteEntity.destroy();
}

