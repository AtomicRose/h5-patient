app.controller('PasswordForgotCtrl', ['$scope', '$rootScope', '$state', 'LoginService', 'dialog', 'helper', 'CommonService', 'StorageConfig', '$stateParams', function ($scope, $rootScope, $state, LoginService, dialog, helper, CommonService, StorageConfig, $stateParams) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: false,
        title: '找回密码'
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

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
            captcha_code: parseInt($scope.pwdForgot_captcha),
            id: _captchaId
        };
        var smsParams = {
            smsVerifyCode: {
                mobile: $scope.pwdForgot_phone,
                action_type: 101 // the action_type, login:102, fast booking:200
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

    $scope.doResetPwd = function(){
        var spinner = dialog.showSpinner();
        var params = {
            userReset:{
                username:$scope.pwdForgot_phone,
                password: $scope.pwdForgot_password,
                verify_code: $scope.pwdForgot_verifyCode
            }
        };
        LoginService.resetPassword(params).then(function(res){
            dialog.closeSpinner(spinner.id);
            dialog.alert('您已成功重置密码，请用新密码重新登录',{
                closeCallback:function(value){
                    $state.go('layout.login',{
                        backRoute:'layout.home'
                    });
                }
            });
        },function(res){
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    };
}]);