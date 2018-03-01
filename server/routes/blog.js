var express = require('express');
var router = express.Router();
var controller = require('../controllers/blog')
var auth = require('../middleware/authentication')
let image = require('../multer')
/* GET home page. */

//blog
router.get('/user/:id', controller.getByIdUser)
router.get('/', controller.getAll)

router.post('/',auth, image.multer.single('imgUrl'),image.uploadGCS,controller.create)

router.get('/:id', controller.getById)

router.put('/:id',auth,image.multer.single('imgUrl'),image.uploadGCS, controller.edit)

router.delete('/:id',auth, controller.destroy)

module.exports = router;