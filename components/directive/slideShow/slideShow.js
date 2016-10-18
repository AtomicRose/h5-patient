app.directive('slideShowWidget', [function () {
    var ctrl = ['$scope', '$rootScope', 'helper', '$state', 'CMSDataConfig', function ($scope, $rootScope, helper, $state, CMSDataConfig) {
        $scope.itemList = [1,2,3,4];
        $scope.eleId = (new Date()).getTime().toString();
    }];
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        controller: ctrl,
        templateUrl: "template/slideShow.html",
        scope: {},
        link: function (scope, ele, attrs, ngModelController) {

        }
    }
}]);
app.run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/slideShow.html',
        '<div class="slide-show">\
            <div class="content">\
                <div class="item"></div>\
                <div class="item" ng-repeat="item in itemList">{{item}}</div>\
            </div>\
        </div>');
}]);