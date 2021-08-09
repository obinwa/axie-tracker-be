const axios = require('axios');
let moment = require("moment");
let baseUrl = "http://180.232.101.103:31337/";

async function getPlayerData(roninAddress, percentage,name){
  let [walletName,address] = roninAddress.split(':');

  if(walletName.toLowerCase() !== "ronin") throw Error("Invalid wallet address");
  if(address.length < 1) throw Error("Invalid wallet address");

  let status = await getPlayerStatus(address);
  let earning = await getPlayerEarnings(address);

  let interfaceData = convertDataToInterfaceData(status,earning,percentage,name);
  return interfaceData;
  //console.log(playerData.data);

}

async function getPlayerStatus(roninNumber){
  let url = `${baseUrl}_basicStats/0x${roninNumber}`;
  let playerStatus = await axios.get(url);
  if(playerStatus.data.status === "error") throw Error(playerStatus.data.message);
  return playerStatus.data?.stats;
}

async function getPlayerEarnings(roninNumber){
  let url = `${baseUrl}_schoEarnings/0x${roninNumber}`;
  let playerEarnings = await axios.get(url);
  if(playerEarnings.data.status === "error") throw Error(playerEarnings.data.message);
  return playerEarnings.data?.earnings;
}

function convertDataToInterfaceData(status,earnings,percentage,name){
  let total = earnings.slp_inventory;
  let claimed = earnings.slp_holdings;
  let unclaimed = total - claimed;
  let lastClaimedDate = moment.unix(earnings.last_claimed);
  let dateDiff = moment().diff(lastClaimedDate,'d') + 1;
  percentage = percentage /100;

  let playerData = {};
  playerData["name"] = 	name;
  playerData["total"] =  total;
  playerData["average"] = Math.round(total / dateDiff);
  playerData["unclaimed"] = unclaimed;
  playerData["claimed"] = claimed;
  playerData["lastClaim"] = `${dateDiff} days ago`;
  playerData["claimOn"] =	lastClaimedDate.add(14,'d').format('YYYY-MM-DD');
  playerData["managerSlp"] = Math.round((unclaimed * percentage) + 0.05);
  playerData["scholarSlp"] = Math.round((unclaimed * (1 - percentage)) - 0.05);
  playerData["todaySlp"] = profileData.slp.todaySoFar;
  playerData["elo"] = status.stats.elo;
  playerData["percentage"] = percentage;

}

// (async()=>{
//   await getPlayerStatus("9da19ce95adf96fefd353303b71e15cafff12140");
// })();