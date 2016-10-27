app.controller('BookingDoctorCtrl', ['$rootScope', '$scope', 'dialog', '$stateParams', 'BookingService', 'StorageConfig', '$state', function ($rootScope, $scope, dialog, $stateParams, BookingService, StorageConfig, $state) {
    $scope.sendSMSText = '获取验证码';
    $scope.isShowService = false;
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: false,
        title: '预约医生'
    };
    window.headerConfig.otherRightOperate= {
        enable: true,
        html: '服务流程',
        clickCall: serviceFlow
    }
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    $scope.treatmentDoctorName = $stateParams.doctorName;
    $scope.treatmentHospitalName = $stateParams.hospitalName;
    $scope.treatmentDeptName = $stateParams.departmentName;

    $scope.isCheck = false;
    if(StorageConfig.BOOKING_STORAGE.getItem('booking_doctor')){
        StorageConfig.BOOKING_STORAGE.putItem('booking_doctor',null)
        $scope.$broadcast('setHeaderBack', null);
    }

    function serviceFlow(){
        $scope.isShowService = !$scope.isShowService;
    }
    $scope.serviceFlow = function(){
        $scope.isShowService = !$scope.isShowService;
    }
    $scope.changeDise = function(){
        dialog.confirm('如果选择其他疾病，我们将为您重新推荐医生。',{
            okText: '重新选择',
            cancelText: '关闭弹框',
            closeCallback: function(value){
                if(value == 0){
                }
                if(value == 1){
                    $state.go('layout.disease');
                }
            }
        })
    }

    var doctorScroll = new IScroll('#doctorScroll', {
        mouseWheel: false,
        // click: true
        click:false,
        preventDefaultException:{label:/.*/}
    });


    setInterval(function () {
        doctorScroll.refresh();
    }, 500);

    // $scope.bookingDoctor = function(_patient){
    //     var _paramsObj = {
    //         booking : {
    //             doctor_id: $stateParams.doctorId,
    //             contact_name: _patient.name,
    //             disease_detail: _patient.diseaseDescription,
    //             disease_name: _patient.diseaseName
    //         }
    //     };
    //     postBookingInfo(_paramsObj);
    // }
    // function postBookingInfo(_params){
    //     var spinner = dialog.showSpinner();
    //     BookingService.postBookingDoctor(_params).then(
    //         function(res){
    //             console.log('suc',res);
    //             doingCall({
    //                 upload: {
    //                     params: {
    //                         'booking[id]': res.results.booking_id
    //                     }
    //                 }
    //             });
    //             var finshInterval = setInterval(function(){
    //                 if(UploadImg.isFinished('uploadImgBox')){
    //                     clearInterval(finshInterval);
    //                     dialog.closeSpinner(spinner.id);
    //                     //if finshed, do the next
    //                     $state.go('layout.order', {
    //                         bookingId: res.results.booking_id
    //                     });
    //                 }
    //             },500);
    //         },
    //         function(res){
    //             dialog.closeSpinner(spinner.id);
    //             dialog.alert(res.errorMsg);
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

        // var _paramsObj = {
        //     booking : {
        //         doctor_id: $stateParams.doctorId,
        //         contact_name: $scope.patient.name,
        //         disease_detail: $scope.patient.diseaseDescription,
        //         disease_name: $scope.patient.diseaseName
        //     }
        // };
        // var spinner = dialog.showSpinner();
        // BookingService.postBookingDoctor(_paramsObj).then(
        //     function(res){
        //         console.log('suc',res);
        //         doingCall({
        //             upload: {
        //                 params: {
        //                     'booking[id]': res.results.booking_id
        //                 }
        //             }
        //         });
        //         var finshInterval = setInterval(function(){
        //             if(UploadImg.isFinished('uploadImgBox')){
        //                 clearInterval(finshInterval);
        //                 dialog.closeSpinner(spinner.id);
        //                 //if finshed, do the next
        //                 $state.go('layout.order', {
        //                     bookingId: res.results.booking_id
        //                 });
        //             }
        //         },500);
        //     },
        //     function(res){
        //         dialog.closeSpinner(spinner.id);
        //         dialog.alert(res.errorMsg);
        //     }
        // );

    }
    function afterCall(upFileList){

    }

    $scope.booking = function(){
        $state.go('layout.booking-success');
    }

    $scope.goAgreement = function(){
        $state.go('layout.aboutAgreement');
    }
}]);
