
let {getPlayerProfile} = require("../api-middleware/index");
let db = require("../model/index");

module.exports.updatePlayerList = async function(req,res,next){
  try {
    await updatePlayersInfo();
    let players = await db.Scholar.findAll();
    res.status(200);
    res.json(players);
  } catch (error) {
    console.log(error);
    next(error);
  }

}

module.exports.playerList = async function(req,res,next){
  try {
    //await updatePlayersInfo();
    let players = await db.Scholar.findAll();
    res.status(200);
    res.json(players);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function updatePlayersInfo(){
  let players = await db.Scholar.findAll();
  for(let player of players){
    let data = await playerProfileAction(player,true);
    data.roninAddress = null;
    await player.update(data);
  }
  return;
}

module.exports.playerProfile = async function(req,res,next){
  let requestInput = req.body;
  try {
    let profile = await playerProfileAction(requestInput);
    await db.Scholar.create(profile);
    res.status(200);
    res.json(profile);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function playerProfileAction(requestInput,update){
  if(!requestInput.roninAddress) return {error:"Please enter ronin wallet address"};
  if(isNaN(requestInput.percentage))  return {error:"Please enter a percentage"};
  if(!requestInput.name)  return {error:"Please enter scholar's name"};

  let name = requestInput.name;
  let percentage = parseInt(requestInput.percentage);
  let roninAddress = requestInput.roninAddress;

  let previousData = await db.Scholar.findByPk(roninAddress);
  if(previousData && !update) throw Error("Data already captured");

  let data = await getPlayerProfile(roninAddress,percentage,name);
  return data;
}

