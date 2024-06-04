export {};
const express = require('express');
const { addUpdateUser, getUser, UpdateprofilePicture, UpdateUsername, UpdateReflinkId, getUsers } = require('../controllers/usersController');

const router = express.Router();

router.post('/addupdateuser', addUpdateUser);
router.post('/getuser', getUser);
router.post('/uploadprofilepicture', UpdateprofilePicture);
router.post('/updatereflinkid', UpdateReflinkId);
router.post('/updateusername', UpdateUsername);
router.get('/getusers', getUsers);

module.exports = router;
