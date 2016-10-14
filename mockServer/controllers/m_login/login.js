var express = require('express');
var router = express.Router();
var base = require("../base");
var logger = require("../../helpers/log");

/**
 * login by phone number & password
 */
router.post("/apiwap/userlogin", function(req, res) {
    var reqBody = req.body;
    logger.debug("/apiwap/userlogin", reqBody);
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
/**
 * login by phone number & message code.
 */
router.post("/apiwap/codelogin", function(req, res) {
    var reqBody = req.body;
    logger.debug("/apiwap/codelogin", reqBody);
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