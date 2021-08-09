let db = require("../model/index");
let cron = require('node-cron');
const scholar = require("../model/scholar");


module.exports = function () {
  cron.schedule('55 23 * * *',async () => { // runs by 8 am everyday
    console.log("inside");
    await updateScholarsSlp();
  });

  // cron.schedule("0 8 * * *", functionName, {
  //   timezone: "America/New_York",
  // });

};

async function updateScholarsSlp() {
  let scholars = await db.Scholar.findAll();
  for(let scholar of scholars) {
    let total = scholar.total;
    scholar.totalYesterday = total;
    await scholar.save();
    console.log(` total ${scholar.total}`);
    console.log(scholar.totalYesterday);
  }
}

