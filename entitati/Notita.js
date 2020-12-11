import Sequelize from 'sequelize';
import sequelize from '../dbConfig.js';

const Notita = sequelize.define("Notita",{
    IdNotita:{
        type: Sequelize.INTEGER,
        primaryKey: true,
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
        type: Sequelize.STRING,
        allowNull: true
    }
})

export default Notita;