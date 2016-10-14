app.controller('OperationTrainCtrl', ['$rootScope', '$scope', '$stateParams', '$state',function ($rootScope, $scope, $stateParams, $state) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: false,
        title: '手术直通车'
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    // $scope.treatmentHospital = $stateParams.hospitalName;
    // $scope.treatmentDepartment = $stateParams.departmentName;
    $scope.routerGo = function(url){
        $state.go(url);
    }

    // console.log(document.getElementById('layoutHeader'));
    document.getElementsByClassName('operation-train-page')[0].style.height = document.getElementById('layoutContent').clientHeight + 'px';
}]);

app.controller('QuickBookingCtrl', ['$rootScope', '$scope', 'dialog', '$stateParams', 'BookingService', '$state', 'CommonService', 'StorageConfig', function ($rootScope, $scope, dialog, $stateParams, BookingService, $state, CommonService, StorageConfig) {
    $scope.isLogin = false;
    if (!StorageConfig.TOKEN_STORAGE.getItem('authorization')){
        $scope.isLogin = true;
    }

    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: true,
        title: '快速预约'
    };
    window.footerConfig = {
        enableFooter: false
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    $rootScope.$broadcast('setFooterConfig', window.footerConfig);

    $scope.routerGo = function(url){
        $state.go(url);
    };

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

    $scope.sendSMSText = '发送验证码';
    $scope.sendSMSCode = function (_bookingInfo) {
        console.log('$scope.bookingInfo',$scope.bookingInfo);
        $scope.lockEnabled = true;
        var validParams = {
            captcha_code: parseInt(_bookingInfo.captcha),
            id: _captchaId
        };
        var smsParams = {
            smsVerifyCode: {
                mobile: _bookingInfo.mobile,
                action_type: 200 // the action_type, login:102, fast booking:200
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

    // $scope.bookingQuick = function(){
    //     console.log('_phone',$scope.codeLogin_phone,$scope.codeLogin_verifyCode);
    //     if($scope.isLogin){
    //         var _regObj = {
    //             mobile: $scope.codeLogin_phone,
    //             verify_code: $scope.codeLogin_verifyCode
    //         }
    //         var _params = {
    //             booking: angular.extend(_regObj, $scope.bookingInfo)
    //         };
    //     }else{
    //         var _params = {
    //             booking: $scope.bookingInfo
    //         };
    //     }
    //     console.log('_params',_params);
    //     postBookingInfo(_params);
    // }

    // function postBookingInfo(_params){
    //     var spinner = dialog.showSpinner();
    //     BookingService.postBookingQuick(_params).then(
    //         function(res){
    //             dialog.closeSpinner(spinner.id);
    //             $state.go('layout.order',{
    //                 bookingId: res.results.booking_id
    //                 // bookingTitle: _params.contact_name,
    //                 // bookingDetail: _params.disease_detail,
    //             });
    //         },
    //         function(res){
    //             dialog.closeSpinner(spinner.id);
    //             console.log('err',res);
    //         }
    //     );
    // }


    UploadImg.init({
        id: 'uploadImgBox',
        title: '请上传您的病例图片',
        multiple: false, // enable the component can select multiple files in one time. In mobile, please use the false.
        maxCount: 9, // the max number picture could upload.
        // autoUpload: false,
        required: false, //ctrl you must upload images files or not. if false, the UploadImg.isFinished() init is true.
        // imgListArray: [],
        upload: {
            uploadUrl: 'https://up-z0.qbox.me/',
            token: '',
            tokenUrl: window.envs.file_url,
            type: 'POST',
            async: true,
            nameSpace: '',
            submitBtnId: 'btnBooking',
            beforeCall: beforeCall,
            afterCall: afterCall,
            params: {}
        }
    });
    function beforeCall(doingCall){
        //AJAX first send to get a booking id, then set it to the upload config.
        console.log('$scope.bookingInfo',$scope.bookingInfo);
        var _params;
        if($scope.isLogin){
            var _pObj = $scope.bookingInfo;
            var _regObj = {
                mobile: _pObj.mobile,
                verify_code: _pObj.verifyCode
            }
            _params = {
                booking: angular.extend(_regObj, $scope.bookingInfo)
            };
        }else{
            _params = {
                booking: $scope.bookingInfo
            };
        }

        var spinner = dialog.showSpinner();
        BookingService.postBookingQuick(_params).then(
            function(res){
                dialog.closeSpinner(spinner.id);
                console.log('token',res.results.token);
                StorageConfig.TOKEN_STORAGE.putItem('authorization',res.results.token);
                doingCall({
                    upload: {
                        params: {
                            'booking[id]': res.results.booking_id
                        }
                    }
                });
                var finshInterval = setInterval(function(){
                    if(UploadImg.isFinished('uploadImgBox')){
                        clearInterval(finshInterval);
                        dialog.closeSpinner(spinner.id);
                        //if finshed, do the next
                        $state.go('layout.order', {
                            bookingId: res.results.booking_id
                        });
                    }
                },500);
            },
            function(res){
                dialog.closeSpinner(spinner.id);
                dialog.alert(res.errorMsg);
            }
        );
    }
    function afterCall(upFileList){

    }

    $scope.goAgreement = function(){
        $state.go('layout.aboutAgreement');
    }
    
}]);