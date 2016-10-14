app.controller('UploadImgCtrl', ['$scope', '$rootScope', 'dialog', function ($scope, $rootScope, dialog) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: false,
        title: '图片上传'
    };
    window.footerConfig = {
        enableFooter: true
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
    $rootScope.$broadcast('setFooterConfig', window.footerConfig);
    UploadImg.init({
        id: 'uploadImgBox',
        multiple: false, // enable the component can select multiple files in one time. In mobile, please use the false.
        //maxCount: 3, // the max number picture could upload.
        // autoUpload: false,
        //required: false, //ctrl you must upload images files or not. if false, the UploadImg.isFinished() init is true.
        // imgListArray: [],
        upload: {
            uploadUrl: 'https://up-z0.qbox.me/',
            token: 'td6d3pspQec1dUQC_SVUkhyLlqRSYDFqIFHAh44A:YPbYsI4SvjJvVxyOS_9LIDHJB0Q=:eyJzY29wZSI6ImltYWdldGVzdCIsImRlYWRsaW5lIjoxNDc1OTk3NjI2fQ==',
            tokenUrl: 'http://121.40.127.64:8089/api/tokenbookingmr',
            type: 'POST',
            async: true,
            nameSpace: '',
            params: {}
        }
    });
    // setInterval(function(){
    //     console.log('isFinished', UploadImg.isFinished('uploadImgBox'));
    //     console.log(UploadImg.getImgInfo('uploadImgBox'));
    // }, 500);
}]);