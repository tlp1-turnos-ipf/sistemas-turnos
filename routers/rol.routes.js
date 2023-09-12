const router = require("express").Router();
const {isRol} = require('../middlewares/roles')
const {getUser} = require('../middlewares/getUser');

router.get('/rol/user', getUser, isRol)

module.exports = router