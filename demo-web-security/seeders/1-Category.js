'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      { name: 'Girls', imagePath: '/img/category-1.jpg' },
      { name: 'Kids', imagePath: '/img/category-2.jpg' },
      { name: 'Women', imagePath: '/img/category-3.jpg' },
      { name: 'Men', imagePath: '/img/category-4.jpg' }
    ];
    items.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    });
    await queryInterface.bulkInsert('Categories', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
