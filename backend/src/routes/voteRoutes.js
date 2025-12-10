const express = require('express');
const router = express.Router();
const controller = require('../controllers/voteController');

router.get('/vote-status', controller.getVoteStatus);
router.post('/vote/start', controller.startVote);
router.post('/vote/close', controller.closeVote);
router.get('/candidates', controller.getCandidates);
router.post('/candidates', controller.addCandidate);
router.put('/candidates/:id', controller.updateCandidate);
router.delete('/candidates/:id', controller.deleteCandidate);
router.post('/candidates/reset', controller.resetCandidates);
router.get('/results', controller.getResults);
router.post('/vote', controller.vote);
router.get('/check-vote-eligibility/:employeeId', controller.checkEligibility);

module.exports = router;
