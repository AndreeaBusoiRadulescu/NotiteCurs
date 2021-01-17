import Sequelize from 'sequelize';
import sequelize from '../dbConfig.js';

const Atasament = sequelize.define("Atasament",{
    IdAtasament:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull: false
    },

    IdNotita:{
        type: Sequelize.INTEGER,
        allowNull: false
    },

    SursaAtasament:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Atasament;

