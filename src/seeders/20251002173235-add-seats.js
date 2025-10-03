'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Seats', [
      // Airplane 3
      { airplaneId: 3, row: 1, col: 'A', type: 'first-class', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 3, row: 1, col: 'B', type: 'first-class', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 3, row: 2, col: 'A', type: 'business', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 3, row: 2, col: 'B', type: 'business', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 3, row: 3, col: 'A', type: 'economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 3, row: 3, col: 'B', type: 'economy', createdAt: new Date(), updatedAt: new Date() },

      // Airplane 5
      { airplaneId: 5, row: 1, col: 'A', type: 'first-class', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 5, row: 1, col: 'B', type: 'first-class', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 5, row: 2, col: 'A', type: 'business', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 5, row: 2, col: 'B', type: 'business', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 5, row: 3, col: 'A', type: 'economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 5, row: 3, col: 'B', type: 'economy', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
