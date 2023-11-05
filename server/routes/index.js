const Router = require("express");
const router = new Router();
const converterRouter = require("./converterRouter");

router.use("/converter", converterRouter);

module.exports = router;