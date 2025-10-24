const express = require('express')

const {cityController} = require('../../controllers');
const router = express.Router();

// /api/v1/cities POST
router.post('/', cityController.createCity)

module.exports=router;
