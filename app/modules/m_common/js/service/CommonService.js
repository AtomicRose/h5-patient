app.service('CommonService',['BaseHttpRequest',function(BaseHttpRequest){
    var apiUrl = window.envs.api_url;
    function sendSMSCodeDto(res){
        return res;
    }
    function getCaptchaDto(res){
        return res;
    }
    function validCaptchaDto(res){
        return res;
    }
    function getCityDto(res){
        return res;
    }

    var service = {
        sendSMSCode: function(params){
            var requestObj = {
                url: apiUrl +　'/apiwap/smsverifycode',
                data: params
            };
            return BaseHttpRequest.post(requestObj, sendSMSCodeDto);
        },
        getCaptcha: function(){
            var requestObj = {
                url: apiUrl + '/apiwap/getcaptcha'
            };
            return BaseHttpRequest.get(requestObj, getCaptchaDto);
        },
        validCaptcha: function(params){
            var requestObj = {
                url: apiUrl + '/apiwap/checkcaptcha',
                params: params
            };
            return BaseHttpRequest.get(requestObj, validCaptchaDto);
        },
        getCity: function(params){
            var requestObj = {
                url: apiUrl + '/apiwap/city',
                params: params
            };
            return BaseHttpRequest.get(requestObj, validCaptchaDto);
        }
    };
    return service;
}]);