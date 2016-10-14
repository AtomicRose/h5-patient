var express = require('express');
var router = express.Router();
var base = require("../base");
var logger = require("../../helpers/log");
var CryptoJS = require('crypto-js');

router.get("/getAccessKey", function (req, res) {
    var reqBody = req.body;
    logger.debug("/getAccessKey", reqBody);
    logger.debug(CryptoJS.HmacSHA1("Message", "Key"));
    setTimeout(function () {
        base.apiOkOutput(res, {
            "status": "ok",
            "errorCode": 0,
            "errorMsg": "success",
            "results": CryptoJS.HmacSHA1("Message", "Key")
        });
    }, 1000);
});

/**
 * send the phone message about the code
 */
router.post("/apiwap/smsverifycode", function (req, res) {
    var reqBody = req.body;
    logger.debug("/apiwap/smsverifycode", reqBody);
    setTimeout(function () {
        base.apiOkOutput(res, {
            "status": "ok",
            "errorCode": 0,
            "errorMsg": "success"
        });
    }, 1000);
});
/**
 * validate the image captcha code.
 */
router.post("/apiwap/validCaptcha", function (req, res) {
    var reqBody = req.body;
    logger.debug("/apiwap/validCaptcha", reqBody);
    setTimeout(function () {
        base.apiOkOutput(res, {
            "status": "ok",
            "errorCode": 0,
            "errorMsg": "success"
        });
    }, 1000);
});
/**
 * get city by some filter params
 */
router.get("/apiwap/city", function (req, res) {
    var reqBody = req.body;
    logger.debug("/apiwap/city", reqBody);
    setTimeout(function () {
        base.apiOkOutput(res, {
            "status": "ok",
            "errorCode": 0,
            "errorMsg": "success",
            "results": [
                {"id": "1", "city": "北京", "is_hot": "1"},
                {"id": "73", "city": "上海", "is_hot": "1"},
                {"id": "200", "city": "广州", "is_hot": "1"},
                {"id": "134", "city": "济南", "is_hot": "0"},
                {"id": "74", "city": "南京", "is_hot": "0"},
                {"id": "87", "city": "杭州", "is_hot": "0"},
                {"id": "98", "city": "合肥", "is_hot": "0"},
                {"id": "151", "city": "郑州", "is_hot": "0"},
                {"id": "255", "city": "成都", "is_hot": "0"},
                {"id": "254", "city": "重庆", "is_hot": "0"},
                {"id": "308", "city": "西安", "is_hot": "0"},
                {"id": "169", "city": "武汉", "is_hot": "0"},
                {"id": "186", "city": "长沙", "is_hot": "0"},
                {"id": "37", "city": "沈阳", "is_hot": "0"},
                {"id": "2", "city": "天津", "is_hot": "0"},
                {"id": "78", "city": "苏州", "is_hot": "0"},
                {"id": "135", "city": "青岛", "is_hot": "0"},
                {"id": "100", "city": "蚌埠", "is_hot": "0"},
                {"id": "99", "city": "芜湖", "is_hot": "0"},
                {"id": "38", "city": "大连", "is_hot": "0"}
            ]
        });
    }, 1000);
});

module.exports = router;