import sequelize from '../dbConfig.js';
import bcrypt from 'bcrypt';
import Atasament from '../entitati/Atasament.js';
import Notita from '../entitati/Notita.js';

Notita.hasMany(Atasament, {as: "Atasamente", foreignKey: "IdNotita"});
Atasament.belongsTo(Notita, {foreignKey: "IdNotita"});


export async function creareNotita(notita){
    return await Notita.create(notita, {
        include: [
            {model: Atasament, 
            as: "Atasamente"}
        ]
    });
}

export async function getNotita(){
    return await Notita.findAll(
        {              
            include: [
          {
              model: Atasament,
              as: "Atasamente"
          }
        ]
      })   
}

export async function stergereNotita(id){
    let deleteElem = await Notita.findByPk(id);

    if (!deleteElem){
      console.log("Acest element nu exista, deci nu poate fi sters");
      return;
    }  

    try{
        return await deleteElem.destroy();
    }catch(e){
      let message = "Aceasta entitate este deja folosita"
        if (e.message.includes("FK_Atasament_Notita")){            
          console.log(message);
          return message;
        }
        else
          throw(e);  
    }
}

