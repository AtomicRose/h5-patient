app.controller('RegisterCtrl', ['$scope', '$rootScope', '$state', 'CommonService', 'dialog', 'RegService', '$stateParams', 'StorageConfig', 'helper', function ($scope, $rootScope, $state, CommonService, dialog, RegService, $stateParams, StorageConfig, helper) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: false,
        title: '注册',
        otherRightOperate: {
            enable: true,
            html: '立即登录',
            clickCall: function () {
                $state.go('layout.login');
            }
        }
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    var headerBackOption = {};
    if ($stateParams.backRoute) {
        headerBackOption.route = $stateParams.backRoute;
        $rootScope.$broadcast('setHeaderBack', headerBackOption);
    }
    if ($stateParams.backUrl) {
        headerBackOption.url = $stateParams.backUrl;
        $rootScope.$broadcast('setHeaderBack', headerBackOption);
    }


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
    function getCaptcha(){
        CommonService.getCaptcha().then(
            function(res){
                $scope.captchaUrl = apiUrl + res.result.image;
                _captchaId = res.result.id;
            },
            function(res){
                console.log('err',res);
            }
        );
    }

    $scope.showPwd = false;
    $scope.pwdInputType = 'password';
    $scope.ctrlPwd = function(){
        $scope.showPwd = !$scope.showPwd;
        $scope.pwdInputType = $scope.showPwd?'text':'password';
    };

    /**
     * send the phone message code.
     */
    $scope.sendSMSText = '发送验证码';
    $scope.sendSMSCode = function () {
        $scope.lockEnabled = true;
        var validParams = {
            captcha_code: parseInt($scope.reg_captcha),
            id: _captchaId
        };
        var smsParams = {
            smsVerifyCode: {
                mobile: $scope.reg_phone,
                action_type: 100 // the action_type, login:102, fast booking:200
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

    $scope.doRegister = function () {
        var spinner = dialog.showSpinner();
        var params = {
            userRegister: {
                username: $scope.reg_phone,
                verify_code: $scope.reg_verifyCode,
                password: $scope.reg_password
            }
        };
        RegService.reg(params).then(function (res) {
            dialog.closeSpinner(spinner.id);
            dialog.toast('您已成功注册名医主刀');
            /**
             * set or modify the sessionStorage's authorization. After when we call the interface, the http request will
             * add the Authorization param in the request headers.
             */
            StorageConfig.TOKEN_STORAGE.putItem('authorization', res.results.token);
            //if have the param 'redirectUri', we should redirect to the uri.
            if (helper.getUrlParam('redirectUri')) {
                window.location.href = decodeURIComponent(helper.getUrlParam('redirectUri'));
                return true;
            }
            //if have the param 'redirectRoute', we should go to the router by the route name.
            if (helper.getUrlParam('redirectRoute')) {
                $state.go(decodeURIComponent(helper.getUrlParam('redirectRoute')));
                return true;
            }
            //others we go to the me page.
            $state.go('layout.me');
        }, function (res) {
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    };
}]);