app.directive('sidebarWidget', [function () {
    var ctrl = ['$scope', '$rootScope', 'helper', '$state', 'CMSDataConfig', 'StorageConfig', function ($scope, $rootScope, helper, $state, CMSDataConfig, StorageConfig) {
        var e_sidebar = document.getElementById('layoutSidebar');
        $scope.isOpen = false;
        function _open() {
            $scope.isOpen = true;
            toggleSidebar($scope.isOpen);
            if (!$rootScope.$$phase) {
                $scope.$apply();
            }
            return true;
        }

        function _close() {
            $scope.isOpen = false;
            toggleSidebar($scope.isOpen);
            if (!$rootScope.$$phase) {
                $scope.$apply();
            }
            return false;
        }

        function _toggle() {
            $scope.isOpen = !$scope.isOpen;
            toggleSidebar($scope.isOpen);
            if (!$rootScope.$$phase) {
                $scope.$apply();
            }
            return $scope.isOpen;
        }

        var indexTimeOut;
        function toggleSidebar(_toggle){
            if (!_toggle) {
                indexTimeOut = setTimeout(function() {
                    e_sidebar.style.zIndex = '-1';
                    clearTimeout(indexTimeOut);
                }, 200);
            }else{
                e_sidebar.style.zIndex = '9999';
            }
        }

        window.LayoutSidebar = {
            open: _open,
            close: _close,
            toggle: _toggle
        };
        $scope.closeSidebar = function () {
            return _close();
        };

        $scope.menuList = CMSDataConfig.appMenus;
        $scope.clickItem = function (item) {
            if (item.beforeCall && typeof(item.beforeCall) === 'function' && item.beforeCall()) {
                if (item.beforeCall()) {
                    if (item.route) {
                        window.LayoutSidebar.close();
                        $state.go(item.route, item.params);
                    }
                }
            } else {
                if (item.route) {
                    window.LayoutSidebar.close();
                    $state.go(item.route, item.params);
                }
            }
        };
        $scope.goLogin = function(){
            window.LayoutSidebar.close();
            $state.go('layout.login',{
                redirectRoute:'layout.home',
                backHome: 'layout.home'
            });
        };

        if (StorageConfig.TOKEN_STORAGE.getItem('authorization')){
            $scope.username = 'popoAO'; //写死 用户名
        }

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
        '<div class="sidebar" id="layoutSidebar">\
            <div class="sidebar-shadow" ng-class="{true:\'open-shadow\',false:\'close-shadow\'}[isOpen]"></div>\
            <div class="sidebar-container" ng-class="{true:\'open-container\',false:\'close-container\'}[isOpen]">\
                <div class="content">\
                    <div class="user-info" ng-click="goLogin()">\
                        <div class="left">\
                            <div class="circle">\
                                <img src="app/images/img/head.jpg" alt="">\
                            </div>\
                        </div>\
                        <div class="right" ng-bind="username||\'您好！请登录\'"></div>\
                    </div>\
                    <div class="cell-group list">\
                        <div class="cell" ng-repeat="item in menuList" ng-click="clickItem(item)">\
                            <div class="left-box">\
                                <i class="iconfont {{item.class}}"></i>\
                            </div>\
                            <div class="middle-box">\
                                <span class="label" ng-bind="item.text"></span>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="white" ng-click="closeSidebar()"></div>\
            </div>\
        </div>');
}]);