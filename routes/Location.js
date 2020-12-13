const router = require("express").Router();

const LocationController = require("../controllers/LocationController");

router.get("/", LocationController.index);
router.post("/store", LocationController.store);
router.get("/show/:locationId", LocationController.show);
router.post("/update/:locationId", LocationController.update);
router.get("/delete/:locationId", LocationController.destroy);

module.exports = router;
