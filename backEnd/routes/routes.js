const express = require('express');
const router = express.Router();
const {
    storingCredentialsInDb,
    credentialVerification,
    getAllData,
    postData,
    deleteData,
    putData
} = require('../controllers/logic');

// Route definitions
router.post('/signup', storingCredentialsInDb);
router.post('/signin', credentialVerification);
router.route('/data')
    .get(getAllData)
    .post(postData);

router.route('/data/:id')
    .put(putData)
    .delete(deleteData);

module.exports = router;

