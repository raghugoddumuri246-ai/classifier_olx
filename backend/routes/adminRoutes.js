const express = require('express');
const router = express.Router();
const {
    getUsers,
    getProducts,
    updateProductStatus,
    getPayments,
    getCategories,
    createCategory,
    getLocations,
    createLocation,
    getSliders,
    createSlider,
    deleteSlider,
    getOffers,
    createOffer
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/sliders');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpg|jpeg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Images only!');
        }
    },
});

router.use(protect);
router.use(admin);

router.get('/users', getUsers);
router.get('/products', getProducts);
router.put('/products/:id/status', updateProductStatus);
router.get('/payments', getPayments);

router.route('/categories')
    .get(getCategories)
    .post(createCategory);

router.route('/locations')
    .get(getLocations)
    .post(createLocation);

router.route('/sliders')
    .get(getSliders)
    .post(upload.single('image'), createSlider);
router.delete('/sliders/:id', deleteSlider);

router.route('/offers')
    .get(getOffers)
    .post(createOffer);

module.exports = router;
