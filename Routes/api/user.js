const router = require('express').Router();
const auth = require('../auth');
const user = require('../../controllers/User');

router.put('/password', auth.required, user.updatePassword);
router.get('/user', auth.required, user.getCredentials);
router.post('/login', user.login);
router.post('/register', user.register);

module.exports = router;
