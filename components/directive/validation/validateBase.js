app.directive('validateBase', ['regexRuleConst','ValidationLog','helper', function (regexRuleConst,ValidationLog,helper) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, ele, attrs, ngModelController) {
            var inputEle = ele[0];
            inputEle.addEventListener('blur', function(){
                if(ngModelController.$error.required){
                    return ValidationLog.append(attrs.placeholder);
                }
                if(!helper.isEmptyObject(ngModelController.$error)){
                    return ValidationLog.append(attrs.validateBase);
                }
            });
        }
    }
}]);