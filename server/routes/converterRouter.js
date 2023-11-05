const Router = require("express");
const router = new Router();
const ConverterController = require("../controllers/converterController");

router.post("/doConvert", ConverterController.doConvert);

module.exports = router;