const { Sequelize } = require('sequelize');

const sequlize = new Sequelize('ordermanagement',
    'postgres', 'om',{
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    }
);

sequlize.authenticate().then(() => {
    console.log('connected to the postgres database successfully!!!')
}).catch((err) => {
    console.log('unable to connect to the postgressql database',err)
})

module.exports = sequlize;