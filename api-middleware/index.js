let firstApi = require("./scho-tracker");
let secondApi = require("./axie-management");

module.exports.getPlayerProfile = async function(roninAddress, percentage,name){
  try {
    let firstCallData = await firstApi.getPlayerData(roninAddress, percentage,name);
    if(firstCallData.error){
      let secondCallData = await secondApi.getPlayerData(roninAddress, percentage,name);
      if(secondCallData.error){
        throw Error("An error occurred. Please check the ronin wallet address is correct");
      }
      return secondCallData;
    }
    return firstCallData;
  } catch (error) {
    console.log(error);
    throw Error("An error occurred. Please check the ronin wallet address is correct");
  }
}