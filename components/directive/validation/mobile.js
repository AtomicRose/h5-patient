app.directive('validateMobile', ['regexRuleConst', 'ValidationLog', function (regexRuleConst, ValidationLog) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, ele, attrs, ngModelController) {
            var MOBILE_REGEXP = regexRuleConst.mobile;
            ngModelController.$parsers.push(function (viewValue) {
                ngModelController.$setValidity('mobile', MOBILE_REGEXP.test(viewValue));
                return viewValue;
            });
            var inputEle = ele[0];
            inputEle.addEventListener('blur', function () {
                if (ngModelController.$error.required) {
                    return ValidationLog.append(attrs.placeholder);
                }
                if (ngModelController.$error.mobile) {
                    return ValidationLog.append('请输入11位正确的手机号码');
                }
            });
        }
    }
}]);