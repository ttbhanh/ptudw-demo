'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const items = [{
            "email": "edeferraris0@domainmarket.com",
            "password": "AXI3CxWdu",
            "firstName": "Enrico",
            "lastName": "De Ferraris",
            "mobile": "506-883-2766",
            "isAdmin": true
        }, {
            "email": "lcarlick1@furl.net",
            "password": "kUzhyPDAB",
            "firstName": "Lisle",
            "lastName": "Carlick",
            "mobile": "685-500-0168"
        }, {
            "email": "fochiltree2@nytimes.com",
            "password": "x1Q3NnKVg5oB",
            "firstName": "Frederich",
            "lastName": "Ochiltree",
            "mobile": "387-491-7478"

        }, {
            "email": "dblasetti3@wufoo.com",
            "password": "vY3dpY",
            "firstName": "Dorolisa",
            "lastName": "Blasetti",
            "mobile": "768-449-9990"

        }, {
            "email": "ryelland4@de.vu",
            "password": "RNqceiBJWMjI",
            "firstName": "Rosaleen",
            "lastName": "Yelland",
            "mobile": "658-130-3536"

        }];
        items.forEach(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
        });
        await queryInterface.bulkInsert('Users', items, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
