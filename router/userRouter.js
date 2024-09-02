const express = require('express');
const router = express.Router();
const {createNewUser, 
    loginUser, 
    currentUser
} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/register', createNewUser);
router.post('/login', loginUser);
router.get('/current', validateToken, currentUser);

module.exports = router;