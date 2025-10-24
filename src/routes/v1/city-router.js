const express = require('express')

const {cityController} = require('../../controllers');
const {CityMiddlewares} = require('../../middlewares')
const router = express.Router();

// /api/v1/cities POST
router.post('/', 
    CityMiddlewares.validateCreateRequest,
    cityController.createCity)

router.delete('/:id',
    cityController.deleteCity
)

router.patch('/:id',
    CityMiddlewares.validateUpdateRequest,
    cityController.updateCity
)

module.exports=router;
