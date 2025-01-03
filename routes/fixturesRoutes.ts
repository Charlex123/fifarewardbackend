export {};
const express = require("express");
const { loadCupFixtures, loadFixtures, loadleagueFixtures, loadTodaysFixtures, loadFixturesByDate, loadMatchFixture, searchFixturesbyKeyWords, searchFixtureByMatchId, searchFixtureByTeam, searchFixturesResults, searchMatchbyKeyWords, loadMatchSearchResult} = require("../controllers/fixturesController");
const router = express.Router();

router.get("/loadfixtures", loadFixtures);
router.get("/loadcupfixtures", loadCupFixtures);
router.post("/loadleaguefixtures", loadleagueFixtures);
router.post("/loadtodaysfixtures", loadTodaysFixtures);
router.post("/loadfixturesbydate", loadFixturesByDate);
router.post("/searchfixtbykeyword", searchFixturesbyKeyWords);
router.post("/searchfixtbyteam", searchFixtureByTeam);
router.post("/searchmatchbykeyword", searchMatchbyKeyWords);
router.post("/searchfixturesresults", searchFixturesResults);
router.post("/loadmatchsearchresult", loadMatchSearchResult);
router.post("/searchfixtbymatchid", searchFixtureByMatchId);
router.post("/loadmatch", loadMatchFixture);

module.exports = router;