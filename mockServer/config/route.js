var logger = require("../helpers/log");
var exception = require("../helpers/exception");
var p1 = require('../controllers/p1');
var m_login = require('../controllers/m_login/login.js');
var m_common = require('../controllers/m_common/common');
var m_hospital = require('../controllers/m_hospital/hospital');
var m_register = require('../controllers/m_register/register');

var _app = null;
/// error handlers
var errorHandler404 = function (req, res, next) {
    var err = new Error('404 Not Found!');
    err.status = 404;
    next(err);
};
var errorHandler500 = function (err, req, res, next) {
    res.status(err.status || 500);
    var contentType = req.get('Content-Type');
    switch (contentType) {
        case "application/json":
            exception.writeJSONError(res, err);
            break;
        default:
            res.render('error', {
                message: err.message,
                // production error handler, development will print stacktrace
                error: _app.get('env') !== 'production' ? err : {}
            });
            break;
    }
};

module.exports = {
    init: function (app) {

        _app = app;

        // allow cros domin supports for all api request.
        _app.all("*", function (req, res, next) {
            // setting default timeout for httpserver.
            res.setTimeout(10 * 60 * 1000, function () {
                logger.error("Nodejs Web server timeout!!!!");
                exception.writeJSONError(res, new Error("Nodejs Web server timeout!!!!"));
            });
            res.set({
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            });
            next();
        });
        //
        _app.use('/', p1);
        _app.use('/', m_login);
        _app.use('/', m_common);
        _app.use('/', m_hospital);
        _app.use('/', m_register);
        /// catch 404 and forward to error handler
        // _app.use(errorHandler404);

        // catch 500 and other error and stop app exec.
        // _app.use(errorHandler500);
    }
}
