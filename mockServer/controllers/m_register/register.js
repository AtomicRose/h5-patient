var express = require('express');
var router = express.Router();
var base = require("../base");
var logger = require("../../helpers/log");

/**
 * user register
 */
router.post("/apiwap/register", function(req, res) {
    var reqBody = req.body;
    logger.debug("/apiwap/register", reqBody);
    setTimeout(function(){
        base.apiOkOutput(res, {
            "status": "ok",
            "errorCode": 0,
            "errorMsg": "success",
            "results": {
                "token": "2233E39195227B14C507ABE18820803C"
            }
        });
    }, 1000);
});

module.exports = router;