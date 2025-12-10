const express = require('express');
const router = express.Router();
const controller = require('../controllers/prizeController');

router.get('/draw', controller.drawPrizes);
router.get('/prizes', controller.getPrizes);
router.post('/prizes', controller.addPrize);
router.put('/prizes/:id', controller.updatePrize);
router.delete('/prizes/:id', controller.deletePrize);
router.post('/prizes/reset', controller.resetPrizes);

module.exports = router;
