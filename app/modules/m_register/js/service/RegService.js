app.service('RegService', ['BaseHttpRequest', function(BaseHttpRequest){
    var apiUrl = window.envs.api_url;
    function regDto(res){
        return res;
    }
    var service = {
        reg: function(params){
            var requestObj = {
                url: apiUrl +　'/apiwap/userregister',
                data: params
            };
            return BaseHttpRequest.post(requestObj, regDto);
        }
    };
    return service;
}]);