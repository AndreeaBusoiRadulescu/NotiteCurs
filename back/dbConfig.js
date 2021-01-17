import Sequelize from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'mssql',
    database: 'NotiteCurs',
    username: 'sa',
    host: 'localhost',
    port: '54325',
    password: '1234',
    validateBulkLoadParameters: true,
    define: {
        timestamps: false,
        freezeTableName: true
    }
})

export default sequelize;