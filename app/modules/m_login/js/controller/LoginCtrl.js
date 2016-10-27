app.controller('LoginCtrl', ['$scope', '$rootScope', '$state', 'LoginService', 'dialog', 'helper', 'CommonService', 'StorageConfig', '$stateParams', function ($scope, $rootScope, $state, LoginService, dialog, helper, CommonService, StorageConfig, $stateParams) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: false,
        title: '登录',
        otherRightOperate: {
            enable: true,
            html: '注册',
            clickCall: function () {
                $state.go('layout.register');
            }
        }
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    var headerBackOption = {};
    if ($stateParams.backHash) {
        headerBackOption.hash = $stateParams.backHash;
        $rootScope.$broadcast('setHeaderBack', headerBackOption);
    }
    if ($stateParams.backRoute) {
        headerBackOption.route = $stateParams.backRoute;
        $rootScope.$broadcast('setHeaderBack', headerBackOption);
    }
    if ($stateParams.backUrl) {
        headerBackOption.url = $stateParams.backUrl;
        $rootScope.$broadcast('setHeaderBack', headerBackOption);
    }


    /*****the business*******/
    $scope.selectedTab = 0;
    $scope.checkTab = function (value) {
        $scope.selectedTab = value;
    };

    //TODO you should change the baseUrl to "window.envs.api_url" when the interface build.
    // var baseUrl = 'http://m.mingyizhudao.com';
    // $scope.captchaUrl = baseUrl + '/mobile/user/getCaptcha/' + Math.random();
    // $scope.refreshCaptcha = function () {
    //     $scope.captchaUrl = baseUrl + '/mobile/user/getCaptcha/' + Math.random();
    // };
    var _captchaId = '';
    var apiUrl = window.envs.api_url;
    getCaptcha();
    $scope.refreshCaptcha = function () {
        getCaptcha();
    };
    function getCaptcha() {
        CommonService.getCaptcha().then(
            function (res) {
                $scope.captchaUrl = apiUrl + res.result.image;
                _captchaId = res.result.id;
            },
            function (res) {
                console.log('err', res);
            }
        );
    }

    $scope.showPwd = false;
    $scope.pwdInputType = 'password';
    $scope.ctrlPwd = function () {
        $scope.showPwd = !$scope.showPwd;
        $scope.pwdInputType = $scope.showPwd ? 'text' : 'password';
    };

    /**
     * User login by the mobile & password.
     */
    $scope.passwordLogin_phone = '18556506973';
    $scope.passwordLogin_password = 'jiangyan1';
    $scope.doPasswordLogin = function () {
        var a = dialog.showSpinner();
        var params = {
            userLogin: {
                username: $scope.passwordLogin_phone,
                password: $scope.passwordLogin_password
            }
        };
        LoginService.passwordLogin(params).then(function (res) {
            dialog.closeSpinner(a.id);
            loginSuccessDo(res);
        }, function (res) {
            dialog.closeSpinner(a.id);
            dialog.alert(res.errorMsg);
        });
    };
    /**
     * send the phone message code.
     */
    $scope.sendSMSText = '发送验证码';
    $scope.sendSMSCode = function () {
        $scope.lockEnabled = true;
        var validParams = {
            captcha_code: parseInt($scope.codeLogin_captcha),
            id: _captchaId
        };
        var smsParams = {
            smsVerifyCode: {
                mobile: $scope.codeLogin_phone,
                action_type: 102 // the action_type, login:102, fast booking:200
            }
        };
        /**
         * call the validate captcha interface. Return false in error.
         */
        CommonService.validCaptcha(validParams).then(function (res) {
            //if validate passed, send the mobile message.
            CommonService.sendSMSCode(smsParams).then(function (res) {
                dialog.toast('验证码已发送');
                var count = 60;
                var verifyCodeInterval = setInterval(function () {
                    $scope.sendSMSText = count-- + '秒后重发';
                    $scope.$apply();
                    if (count == 0) {
                        clearInterval(verifyCodeInterval);
                        $scope.sendSMSText = '重新发送';
                        $scope.lockEnabled = false;
                        $scope.$apply();
                    }
                }, 1000);
            }, function (res) {
                dialog.alert(res.errorMsg);
                $scope.lockEnabled = false;
            });
        }, function (res) {
            dialog.toast(res.errorMsg);
            $scope.lockEnabled = false;
        });
    };
    /**
     * User login by mobile and the phone's message code.
     */
    $scope.doCodeLogin = function () {
        var spinner = dialog.showSpinner();
        var params = {
            userLogin: {
                username: $scope.codeLogin_phone,
                verify_code: $scope.codeLogin_verifyCode
            }
        };
        LoginService.codeLogin(params).then(function (res) {
            dialog.closeSpinner(spinner.id);
            loginSuccessDo(res);
        }, function (res) {
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    };

    $scope.goPasswordForgot = function () {
        $state.go('layout.password-forgot');
    };

    function loginSuccessDo(res) {
        /**
         * set or modify the sessionStorage's authorization. After when we call the interface, the http request will
         * add the Authorization param in the request headers.
         */
        StorageConfig.TOKEN_STORAGE.putItem('authorization', res.results.token);
        if (helper.getUrlParam('redirectHash')) {
            window.location.hash = decodeURIComponent(decodeURIComponent(helper.getUrlParam('redirectHash')));
        }
        //if have the param 'redirectUri', we should redirect to the uri.
        if (helper.getUrlParam('redirectUri')) {
            // window.location.href = helper.getUrlParam('redirectUri');
            window.location.href = decodeURIComponent(decodeURIComponent(helper.getUrlParam('redirectUri')));
            return true;
        }
        //if have the param 'redirectRoute', we should go to the router by the route name.
        if (helper.getUrlParam('redirectRoute')) {
            $state.go(decodeURIComponent(helper.getUrlParam('redirectRoute')));
            return true;
        }

        //others we go to the home page.
        $state.go('layout.home');
    }
}]);