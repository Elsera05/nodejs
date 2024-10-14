const { cars, users, auth, order, upload } = require("../controllers");
const path = require('path')
const express = require('express');
const router = express.Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger-autogen.json');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/cars', cars)
router.use('/users', users)
router.use('/auth', auth)
router.use('/order', order)
router.use('/upload', upload)

module.exports = router;

// const controllers = require("../controllers");

// module.exports = function(app){
//     app.use('/api/v1/cars', controllers.cars);
//     app.use('/api/v1/users', controllers.users);
//     app.use('/api/v1/auth',controllers.auth);
//     app.use('/api/v1/order',controllers.order);
//     app.use('/api/v1/upload',controllers.upload);
// };