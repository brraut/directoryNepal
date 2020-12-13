const router = require("express").Router();

const CompanyController = require("../controllers/CompanyController");

const upload = require("../middleware/upload");
const Authenticate = require("../middleware/authenticate");

router.get("/showbytrending", CompanyController.showByTrending);
router.get('/recent', CompanyController.recent);
router.get("/", CompanyController.index);
router.get("/:companyId", CompanyController.show);
router.get("/showBySlug/:companySlug", CompanyController.showBySlug);
router.get("/showByCategory/:slug", CompanyController.showByCategory);
router.post(
	"/store",
	upload.fields([{ name: "logo" }, { name: "banner" }]),
	CompanyController.store
);
router.post(
	"/update/:companyId",
	upload.fields([{ name: "logo" }, { name: "banner" }]),
	CompanyController.update
);
router.post(
	"/update/logo/:companyId",
	upload.single("logo"),
	CompanyController.updateLogo
);
router.post(
	"/update/banner/:companyId",
	upload.single("banner"),
	CompanyController.updateBanner
);
router.get("/delete/:companyId", CompanyController.destroy);
// router.get('/delete/:companyId', Authenticate, CompanyController.destroy)

module.exports = router;
