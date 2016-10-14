app.controller('BookingDepartmentCtrl', ['$rootScope', '$scope', 'dialog', '$stateParams', 'BookingService','$state','$location', function ($rootScope, $scope, dialog, $stateParams, BookingService,$state,$location) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: true,
        title: '预约科室'
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    $scope.treatmentHospital = $stateParams.hospitalName;
    $scope.treatmentDepartment = $stateParams.departmentName;

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
            tokenUrl: window.envs.api_url+'/apiwap/filetoken',
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
        var spinner = dialog.showSpinner();
        var params = {
            booking: {
                doctor_id: '',
                hp_dept_id: $stateParams.departmentId,
                contact_name: $scope.patientName,
                disease_name: $scope.diseaseName,
                disease_detail: $scope.diseaseDesc
            }
        };
        BookingService.bookingWidthDepartmentOrDoctor(params).then(function(res){
            //if success, call doingCall
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
        },function(res){
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }
    function afterCall(upFileList){

    }
    // setInterval(function(){
    //     console.log('isFinished', UploadImg.isFinished('uploadImgBox'));
    //     console.log(UploadImg.getImgInfo('uploadImgBox'));
    // }, 500);

    $scope.goAgreement = function(){
        $state.go('layout.aboutAgreement');
    }
}]);