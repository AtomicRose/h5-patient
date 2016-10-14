app.service('SearchService',['BaseHttpRequest',function(BaseHttpRequest){
    var apiUrl = window.envs.api_url;

    function searchInfoDto(res){
        return res;
    }

    var service = {
        searchInfo: function(params){
            console.log(params.name);
            var requestObj = {
                url: apiUrl +　'/apiwap/search?name='+params.name
            };
            return BaseHttpRequest.get(requestObj, searchInfoDto);
        }
    };
    return service;
}]);