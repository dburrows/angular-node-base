var express = require('express');
var router = express.Router();

var getUsers = require('./getUsers');
var getUser = require('./getUser');

router.get('/', getUsers);
router.get('/:id', getUser);

module.exports = router;
