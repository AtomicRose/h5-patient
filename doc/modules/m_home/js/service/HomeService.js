app.service('HomeService',['BaseHttpRequest',function(BaseHttpRequest){
    function testDto(res){
        return res;
    }
    var service = {
        test: function(params){
            var requestObj = {
                url: 'http://m.mingyizhudao.com/api/hospital',
                params: params
            };
            return BaseHttpRequest.get(requestObj, testDto);
        }
    };
    return service;
}]);