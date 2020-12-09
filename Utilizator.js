import Sequelize from 'sequelize';
import sequelize from './dbConfig.js';

const Utilizator = sequelize.define("Utilizator", {
    UtilizatorId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    EmailAddress:{
        type: Sequelize.STRING,
        allowNull: false
    },

    Parola:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Utilizator;