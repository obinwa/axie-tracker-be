var express = require('express');
var router = express.Router();
let controller = require("../controller/scholar")

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/axie-scholar-management/player', controller.playerProfile);
router.get('/axie-scholar-management/players', controller.playerList);
router.get('/axie-scholar-management/players/update', controller.updatePlayerList);

module.exports = router;
