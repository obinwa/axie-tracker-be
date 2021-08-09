const axios = require('axios');
let moment = require("moment");
let baseUrl = "https://axie-scho-tracker-server.herokuapp.com/api/account/";

async function getPlayerData(roninAddress, percentage,name){
  let [walletName,address] = roninAddress.split(':');

  if(walletName.toLowerCase() !== "ronin") throw Error("Invalid wallet address");
  if(address.length < 1) throw Error("Invalid wallet address");

  let url = `${baseUrl}${roninAddress}`;

  let playerData = await axios.get(url);
  let interfaceData = convertDataToInterfaceData(playerData.data,percentage,name,roninAddress);
  return interfaceData;

}

function convertDataToInterfaceData(profileData,percent,name,roninAddress){
  if(!profileData) return {error:"empty"};
  let total = profileData.slpData.totalSlp;
  let unclaimed = profileData.slpData.gameSlp;
  let lastClaimedDate = moment.unix(profileData.slpData.lastClaim);
  let dateDiff = moment().diff(lastClaimedDate,'d') + 1;
  percentage = percent /100;

  let playerData = {};
  playerData["roninAddress"] = roninAddress;
  playerData["name"] = 	name;
  playerData["total"] =  total;
  playerData["average"] = Math.floor(profileData.slpData.totalSlp / dateDiff);
  playerData["unclaimed"] = profileData.slpData.gameSlp;
  playerData["claimed"] = profileData.slpData.roninSlp;
  playerData["lastClaim"] = `${dateDiff} days ago`;
  playerData["claimOn"] =	moment.unix(profileData.slpData.lastClaim).add(14,'d');
  playerData["managerSlp"] = Math.round((unclaimed * percentage) + 0.05);
  playerData["scholarSlp"] = Math.round((unclaimed * (1 - percentage)) - 0.05);
  playerData["todaySlp"] = null;//profileData.slpData.gameSlp - parseInt(profileData.db.slpTotalYesterday);
  playerData["elo"] = profileData.leaderboardData.elo;
  playerData["percentage"] = percent;

  return playerData;

}

module.exports.getPlayerData = getPlayerData;

