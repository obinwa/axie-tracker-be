'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(
      "Scholar",
      {
        roninAddress: {
          type: Sequelize.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        total: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        totalYesterday: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        average:{
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        unclaimed:{
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        claimed:{
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        lastClaim:{
          type: Sequelize.TEXT,
          allowNull: false,
        },
        claimOn:{
          type: Sequelize.DATE,
          allowNull: false,
        },
        lastUpdated:{
          type: Sequelize.DATE,
          allowNull: true,
  
        },
        managerSlp:{
          type :Sequelize.INTEGER,
          allowNull: false,
        },
        scholarSlp:{
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        todaySlp:{
          type: Sequelize.INTEGER,
        },
        elo:{
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      })
    
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("Scholar");
  }
};
