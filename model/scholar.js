let moment = require('moment');
const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const Scholar = sequelize.define(
    "Scholar",
    {
      roninAddress: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalYesterday: {
        type: DataTypes.INTEGER,
        allowNull: true,

        set(value){
          if(value){
            this.setDataValue("totalYesterday",value);
            this.setDataValue("lastUpdated",moment().toDate());
          }
        }
      },
      average:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unclaimed:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      claimed:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lastClaim:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      claimOn:{
        type: DataTypes.DATE,
        allowNull: false,

        get(){
          return moment(this.getDataValue("claimOn")).format("YYYY-MM-DD");
        }
      },
      lastUpdated:{
        type: DataTypes.DATE,
        allowNull: true,

      },
      managerSlp:{
        type :DataTypes.INTEGER,
        allowNull: false,
      },
      scholarSlp:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      todaySlp:{
        type: DataTypes.INTEGER,

        get(){
          if(!this.getDataValue("lastUpdated") ) return "NA";
          if(moment().diff(moment(this.getDataValue("lastUpdated")),'h') > 24) return "NA."
          if(this.getDataValue("totalYesterday")){
            let todaySlp = parseInt(this.getDataValue("total")) - parseInt(this.getDataValue("totalYesterday"));
            return todaySlp;
          }
          return "NA.."; 
        }
      },
      elo:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      percentage:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },

    },
    {
      sequelize,
      name: {
        singular: "scholar",
        plural: "scholars",
      },
      tableName: "Scholar",
      timestamps: false,
    },
  );
  
  return Scholar;
};
