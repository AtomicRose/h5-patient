app.service('BookingService',['BaseHttpRequest',function(BaseHttpRequest){
    var apiUrl = window.envs.api_url;

    function bookingWidthDepartmentOrDoctorDto(res){
        return res;
    }
    function postBookingDoctorDto(res){
        return res;
    }
    function postBookingQuickDto(res){
        return res;
    }

    var service = {
        bookingWidthDepartmentOrDoctor: function(params){
            var requestObj = {
                url: apiUrl +　'/apiwap/booking',
                data: params
            };
            return BaseHttpRequest.post(requestObj, bookingWidthDepartmentOrDoctorDto);
        },
        postBookingDoctor: function(params){
            var requestObj = {
                url: apiUrl +　'/apiwap/booking',
                data: params
            };
            return BaseHttpRequest.post(requestObj, postBookingDoctorDto);
        },
        postBookingQuick: function(params){
            var requestObj = {
                url: apiUrl +　'/apiwap/quickbooking',
                data: params
            };
            return BaseHttpRequest.post(requestObj, postBookingQuickDto);
        }
    };
    return service;
}]);