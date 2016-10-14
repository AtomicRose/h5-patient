app.service('DoctorService',['BaseHttpRequest',function(BaseHttpRequest){
    var apiUrl = window.envs.api_url;
    // var apiUrl = 'http://192.168.11.196:80';

    function getDoctorByQueryDto(res){
    	return res;
    }
    function getMYYZDoctorDto(res){
        return res;
    }
    function getDoctorDetailDto(res){
        return res;
    }
    function getDetpListDto(res){
        return res;
    }
    function getDiseaseListDto(res){
        return res;
    }

    var service = {
        getDoctorByQuery: function(params){
            var requestObj = {
                url: apiUrl +　'/apiwap/doctor',
                params: params
            };
            return BaseHttpRequest.get(requestObj, getDoctorByQueryDto);
        },
        //名医义诊医生列表
        getMYYZDoctor: function(params){
            var requestObj = {
                url: apiUrl +　'/apiwap/commonwealdoctors',
                params: params
            };
            return BaseHttpRequest.get(requestObj, getMYYZDoctorDto);
        },
        getDoctorDetail: function(opt){
            var requestObj = {
                url: apiUrl +　'/apiwap/doctor/'+opt.id
            };
            return BaseHttpRequest.get(requestObj, getDoctorDetailDto);
        },
        getDetpList: function(){
            var requestObj = {
                url: apiUrl +　'/apiwap/diseasecategory'
            };
            return BaseHttpRequest.get(requestObj,getDetpListDto);
        },
        getDiseaseList: function(opt){
            var requestObj = {
                url: apiUrl +　'/apiwap/diseasebycategory/'+opt.deptId
            };
            return BaseHttpRequest.get(requestObj,getDiseaseListDto);
        }
    };
    return service;
}]);