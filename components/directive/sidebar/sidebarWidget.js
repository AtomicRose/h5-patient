app.directive('sidebarWidget', [function () {
    var ctrl = ['$scope', '$rootScope', 'helper', '$state', function ($scope, $rootScope, helper, $state) {
        var e_sidebar = document.getElementById('layoutSidebar');
        $scope.isOpen = false;
        function _open(){
            $scope.isOpen = true;
            if(!$rootScope.$$phase) {
                $scope.$apply();
            }
            return true;
        }
        function _close(){
            $scope.isOpen = false;
            if(!$rootScope.$$phase) {
                $scope.$apply();
            }
            return false;
        }
        function _toggle(){
            $scope.isOpen = !$scope.isOpen;
            if(!$rootScope.$$phase) {
                $scope.$apply();
            }
            return $scope.isOpen;
        }
        window.LayoutSidebar = {
            open: _open,
            close: _close,
            toggle: _toggle
        };
        $scope.closeSidebar = function(){
            return _close();
        };
    }];
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        controller: ctrl,
        templateUrl: "template/sidebar.html",
        scope: {},
        link: function () {

        }
    }
}]);
app.run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/sidebar.html',
        '<div class="sidebar" ng-class="{true:\'open\',false:\'close\'}[isOpen]" id="layoutSidebar">\
            <div class="content"></div>\
            <div class="white" ng-click="closeSidebar()"></div>\
        </div>');
}]);