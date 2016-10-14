app.service('HospitalService',['BaseHttpRequest',function(BaseHttpRequest){
    var apiUrl = window.envs.api_url;
    function getHospitalByQueryDto(res){
        return res;
    }
    function getDiseasesByIdDto(res){
        return res;
    }
    function getSubcategoryByIdDto(res){
        return res;
    }
    function getHospitalDetailDto(res){
        return res;
    }
    function getDepartmentInfoDto(res){
        return res;
    }
    function getTopHospitalListDto(res){
        return res;
    }
    function getHospitalByCityDto(res){
        return res;
    }

    var service = {
        getHospitalByQuery: function(params){
            var requestObj = {
                url: apiUrl +　'/apiwap/findhospital',
                params: params
            };
            return BaseHttpRequest.get(requestObj, getHospitalByQueryDto);
        },
        getHospitalByCity: function(params){
            var requestObj = {
                url: apiUrl +　'/apiwap/hospital',
                params: params
            };
            return BaseHttpRequest.get(requestObj, getHospitalByCityDto);
        },
        getDiseasesById: function(urlOptions){
            var requestObj = {
                url: apiUrl +　'/apiwap/disease/'+ urlOptions.id
            };
            return BaseHttpRequest.get(requestObj, getDiseasesByIdDto);
        },
        getSubcategoryById: function(urlOptions){
            var requestObj = {
                url: apiUrl +　'/apiwap/subcategory/'+ urlOptions.id
            };
            return BaseHttpRequest.get(requestObj, getSubcategoryByIdDto);
        },
        getHospitalDetail: function(params,urlOptions){
            var requestObj = {
                url: apiUrl +　'/apiwap/hospital/'+urlOptions.id,
                params: params
            };
            return BaseHttpRequest.get(requestObj, getHospitalDetailDto);
        },
        getDepartmentInfo: function(params, urlOptions){
            var requestObj = {
                // url: apiUrl +　'/apiwap/hospital/'+urlOptions.hospitalId+'/department/'+urlOptions.departmentId,
                url: apiUrl +　'/apiwap/hospitaldept/'+urlOptions.departmentId,
                params: params
            };
            return BaseHttpRequest.get(requestObj, getDepartmentInfoDto);
        },
        getTopHospitalList: function(params){
            var requestObj = {
                url: apiUrl +　'/apiwap/tophospital',
                params: params
            };
            return BaseHttpRequest.get(requestObj, getTopHospitalListDto);
        }
    };
    return service;
}]);