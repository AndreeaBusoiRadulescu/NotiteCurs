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

function convertStringToDate(strDate)
{
    // "2014-04-03"
    let parts =strDate.split('-');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    let mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
    return mydate;
}

//adaugare o notita noua
async function creareNotita(notita){
    let error = validareNotita(notita);
    if (error.hasErrors)
        return error

    if(notita.DataNotita !== "")
        notita.DataNotita = convertStringToDate(notita.DataNotita);
    else notita.DataNotita = null;
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
    let notita = await Notita.findByPk(id, {
        include: 
        {
            model: Atasament,
            as: "Atasamente"
        }
    });

    if(!notita)
    {
        return { hasErrors: true, message: "Nu exista o notita cu acest id." };
    }

    return notita;

}

async function getNotite(){
    return await Notita.findAll();
}

async function modificareNotita(id, body){

    //Body-ul are o forma difertia de entitatea Notita.
    //Primim in proprietatea Atasamente un vector de surseAtasamente
    //EX: Atasamente: ["https://www.youtube.com/watch?v=bV5yziDZj3U", "https://www.youtube.com/watch?v=bV5yziDZj3U"]
    //Pentru a lucra cu entitatea Notita, va trebuie sa stergem proprietatea/campul Atasamente.
    //Atasamentele le vom prelua in continuare din body.Atasamente

    let notita = JSON.parse(JSON.stringify(body)); //Asa se copiaza un obiect in Javascript! Foarte nice!
    delete notita.Atasamente;


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

    //sterge atasamentele asociate lui updateEntity
    Atasament.destroy({
        where: {
            IdNotita : updateEntity.IdNotita
        }
    })

    //Readaugam toate atasamentele primite in body (pot fi si atasamente noi)
    for(let sursaAtasament of body.Atasamente)
    {
        await Atasament.create({IdNotita: notita.IdNotita, SursaAtasament: sursaAtasament});
    }

    //Actualizam si entitatea de baza (cea fara atasamente)
    return await updateEntity.update(notita);
}

async function stergereNotita(id){
    let deleteEntity = await getByIdNotita(id);

    if (!deleteEntity)
        return { hasErrors: true, message: "Nu exista o notita cu acest id!" };

    return await deleteEntity.destroy();
}

export {creareNotita,preluareNotiteDupaIdUtilizator,getByIdNotita,getNotite,modificareNotita,stergereNotita};