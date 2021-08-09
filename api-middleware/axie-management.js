const axios = require('axios');
let moment = require("moment");
let baseUrl = "https://api.axie.management/v1/overview/";

async function getPlayerData(roninAddress, percentage,name){
  let [walletName,address] = roninAddress.split(':');

  if(walletName.toLowerCase() !== "ronin") throw Error("Invalid wallet address");
  if(address.length < 1) throw Error("Invalid wallet address");

  let pathVariable = `0x${address}`;
  let url = `${baseUrl}${pathVariable}`;

  let playerData = await axios.get(url);
  let interfaceData = convertDataToInterfaceData(playerData.data,percentage,name,roninAddress);
  return interfaceData;
  //console.log(playerData.data);

}

function convertDataToInterfaceData(profileData,percentage,name,roninAddress){
  if(!profileData.leaderboard.name) return {error:"empty"};
  let total = profileData.slp.total;
  let unclaimed = total - profileData.slp.claimableTotal;
  let lastClaimedDate = moment.unix(profileData.slp.lastClaimedItemAt);
  let dateDiff = moment().diff(lastClaimedDate,'d') + 1;
  percentage = percentage /100;

  let playerData = {};
  playerData["roninAddress"] = roninAddress;
  playerData["name"] = 	name;
  playerData["total"] =  profileData.slp.total;
  playerData["average"] = Math.round(profileData.slp.total / dateDiff);
  playerData["unclaimed"] = profileData.slp.total -  profileData.slp.claimableTotal ;
  playerData["claimed"] = profileData.slp.claimableTotal;
  playerData["lastClaim"] = `${dateDiff} days ago`;
  playerData["claimOn"] =	moment.unix(profileData.slp.lastClaimedItemAt).add(14,'d').format('YYYY-MM-DD');
  playerData["managerSlp"] = Math.round((unclaimed * percentage) + 0.05);
  playerData["scholarSlp"] = Math.round((unclaimed * (1 - percentage)) - 0.05);
  playerData["totalSlp"] = profileData.slp.todaySoFar;
  playerData["elo"] = profileData.leaderboard.elo;
  playerData["percentage"] = percentage;

  return playerData;

}

module.exports.getPlayerData = getPlayerData;

// {
//   slp: {
//     total: 0,
//     claimableTotal: 0,
//     lastClaimedItemAt: 0,
//     todaySoFar: null
//   },
//   leaderboard: {
//     winRate: '0',
//     winTotal: 0,
//     drawTotal: 0,
//     loseTotal: 0,
//     elo: 1200,
//     rank: 2147483647,
//     name: 'Chidi'
//   }
// }


// NAME	- leaderboard.name
// TOTAL - slp.total
// AVERAGE - slp.total/ (moment().diff(moment.unix(slp.lastClaimedItemAt),'d') + 1)
// UNCLAIMED - 	slp.total  - slp.claimableTotal
// CLAIMED	- slp.claimableTotal
// LASTCLAIM - slp.lastClaimedItemAt	
// CLAIM ON	- moment.unix(slp.lastClaimedItemAt).add(14,'d').format();
// MANAGER SLP	- unclaimed * percentage
// SCHOLAR SLP - unclaimed * (100 - percentage)
// TODAY SLP - slp.todaySoFar
// ELO - leaderboard.elo

// (async()=>{
//   let roninAddress = "ronin:46258a9146922cd16e03127c928c4bf17eaa68e1";
//   await getPlayerData(roninAddress,34)
// })();