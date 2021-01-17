import Sequelize from 'sequelize';
import sequelize from '../dbConfig.js';

const Notita = sequelize.define("Notita",{
    IdNotita:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Materie:{
        type: Sequelize.STRING,
        allowNull: false
    },

    UtilizatorId:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    Continut:{
        type: Sequelize.STRING,
        allowNull: false
    },

    DataNotita:{
        type: Sequelize.DATE,
        allowNull: true
    }
})

export default Notita;