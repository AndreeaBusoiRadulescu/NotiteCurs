import sequelize from '../dbConfig.js';
import Utilizator from '../entitati/Utilizator.js';
import bcrypt from 'bcrypt';

//adaugare un utilizator nou
export async function adaugareUtilizator(utilizator){
    await Utilizator.create(utilizator);
}