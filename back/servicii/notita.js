import sequelize from '../dbConfig.js';
import bcrypt from 'bcrypt';
import Notita from '../entitati/Notita.js';
import Utilizator from '../entitati/Utilizator.js';
import Atasament from '../entitati/Atasament.js';


function validareNotita(notita){
    if (!notita || Object.entries(notita).length === 0)
    return { hasErrors: true, message: "Trebuie sa adugati informatii despre notita!" };

if (!notita.Materie)
    return { hasErrors: true, message: "Notita trebuie sa contina obligatoriu materia!" };

if (!notita.UtilizatorId)
    return { hasErrors: true, message: "UtilizatorId este obligatoriu!" };

if (!notita.Continut)
    return { hasErrors: true, message: "Continutul notitei este obligatoriu!" };

return { hasErrors: false, message: "" };
}
//adaugare o notita noua
async function creareNotita(notita){
    let error = validareNotita(notita);
    if (error.hasErrors)
        return error

    return await Notita.create(notita);
}

async function preluareNotiteDupaIdUtilizator(id){
    let user = await Utilizator.findByPk(id);
    if(!user){
        return {
            code : 404,
            res : "Nu exista utilizatorul"
        }
    }
    
    let notiteUser = await Notita.findAll(
        {
            where: 
            {
                UtilizatorId: id
            }, 
            include: 
            {
                model: Atasament,
                as: "Atasamente"
            }
        }
    );

    return {
        code : 200,
        res : notiteUser
    }
}

async function getByIdNotita(id){
    return await Notita.findByPk(id);
}

async function getNotita(){
    return await Notita.findAll();
}

async function modificareNotita(id, notita){
    if (parseInt(id) !== notita.IdNotita){
        return { hasErrors: true, message: "Entitatea e diferita" };
    }

    let updateEntity = await getByIdNotita(id);

    if (!updateEntity)
    {
        return { hasErrors: true, message: "Nu exista o notita cu acest id." }; 
    }

    let error = validareNotita(notita);
    if (error.hasErrors)
        return error

    return await updateEntity.update(notita);
}

async function stergereNotita(id){
    let deleteEntity = await getByIdNotita(id);

    if (!deleteEntity)
        return { hasErrors: true, message: "Nu exista o notita cu acest id!" };

    return await deleteEntity.destroy();
}

export {creareNotita,preluareNotiteDupaIdUtilizator,getByIdNotita,getNotita,modificareNotita,stergereNotita};