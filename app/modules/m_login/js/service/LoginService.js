app.service('LoginService', ['BaseHttpRequest', function (BaseHttpRequest) {
    var apiUrl = window.envs.api_url;

    function passwordLoginDto(res) {
        return res;
    }

    function codeLoginDto(res) {
        return res;
    }

    function resetPasswordDto(res) {
        return res;
    }

    var service = {
        passwordLogin: function (params) {
            var requestObj = {
                url: apiUrl + '/apiwap/userlogin',
                data: params
            };
            return BaseHttpRequest.post(requestObj, passwordLoginDto);
        },
        codeLogin: function (params) {
            var requestObj = {
                url: apiUrl + '/apiwap/usermobilelogin',
                data: params
            };
            return BaseHttpRequest.post(requestObj, codeLoginDto);
        },

        resetPassword: function (params) {
            var requestObj = {
                url: apiUrl + '/apiwap/userresetpassword',
                data: params
            };
            return BaseHttpRequest.post(requestObj, resetPasswordDto());
        }
    };
    return service;
}]);