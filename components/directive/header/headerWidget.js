app.directive('headerWidget', [function () {
    var ctrl = ['$scope', '$rootScope', 'helper', '$state', function ($scope, $rootScope, helper, $state) {
        var defaults = {
            enableHeader: true,
            enableBack: true,
            enableClose: true,
            enableTitle: true,
            enableRefresh: true,
            enableShare: false,
            enableArea: false,
            otherThemeClass: '',
            tabOperate: {
                enableTab: false,
                options: [
                    {
                        name: 'A',
                        id: '0'
                    },
                    {
                        name: 'B',
                        id: '1'
                    }
                ],
                currentTab: 0
            },
            otherRightOperate: {
                enable: false,
                html: '',
                clickCall: ''
            },
            areaOperate: {
                enable: false,
                areas: {
                    hot: [
                        {
                            city: '北京',
                            id: '1'
                        },
                        {
                            city: '上海',
                            id: '1'
                        },
                        {
                            city: '广州',
                            id: '1'
                        },
                        {
                            city: '深圳',
                            id: '1'
                        }
                    ],
                    all: []
                },
                trackKey: 'name'
            },
            title: '名医主刀',
            titleOperate: {
                clickCall: '',
                html: ''
            }
        };
        $scope.defaults = angular.extend(angular.copy(defaults), window.headerConfig);
        document.title = $scope.defaults.title;
        /**
         * This is the $broadcast method for setting headerConfig. So you can use it in controller files like this:
         * -----------------------------------------------------
         * window.headerConfig.title = '小样，你还没有设置title哦';
         * $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
         * -----------------------------------------------------------
         */
        $rootScope.$on('setHeaderConfig', function (event, data) {
            var temp = angular.copy(defaults);
            $scope.defaults = angular.extend(temp, data);
            document.title = $scope.defaults.title;
            $scope.currentArea = helper.isEmptyObject($scope.defaults.areaOperate.currentArea) ? $scope.defaults.areaOperate.areas[0] : $scope.defaults.areaOperate.currentArea;
            $scope.currentTab = $scope.defaults.tabOperate.currentTab;
        });

        /**
         * This is the options for back event. When click the back button. It will filter the options and chose the right operation.
         * Important: the options could use only once. You must clear it before redirect to other page.
         * especially use the 'window.location.href' method, because the code can't run after redirect in some browser.
         *
         * Usually, we only use the back -1, you should not set the options.
         * You can use like this:
         * 1. use the route name where you defined in router.js
         * $scope.$broadcast('setHeaderBack', {
         *     route: 'index',
         *     params: {
         *         name: Atomer,
         *         age: 11
         *     }
         * });
         * 2. use the href url.
         * $scope.$broadcast('setHeaderBack', {
         *     url: 'http://www.mingyizhudao.com/doctor/1101?date=20160808'
         * });
         * 3. use the step. The param type must be number. Usually, it's a negative number.
         * $scope.$broadcast('setHeaderBack', {
         *     step: -2
         * });
         *
         */
        $scope.headerBackOptions = {};
        $rootScope.$on('setHeaderBack', function (event, data) {
            $scope.headerBackOptions = data;
        });
        $scope.goBack = function () {
            helper.closeAllPopAndDialog();
            if ($scope.headerBackOptions && !helper.isEmptyObject($scope.headerBackOptions)) {
                if ($scope.headerBackOptions.route) {
                    var route = $scope.headerBackOptions.route;
                    var params = $scope.headerBackOptions.params || {};
                    $scope.headerBackOptions = {};
                    $state.go(route, params);
                    return 'back with route.';
                }
                if ($scope.headerBackOptions.url) {
                    var url = $scope.headerBackOptions.url;
                    $scope.headerBackOptions = {};
                    window.location.href = decodeURIComponent(url);
                    return 'back with url.';
                }
                if($scope.headerBackOptions.hash){
                    var hash = $scope.headerBackOptions.hash;
                    $scope.headerBackOptions = {};
                    window.location.hash = decodeURIComponent(hash);
                    return 'back with hash.';
                }
                if ($scope.headerBackOptions.step && typeof ($scope.headerBackOptions.step) === 'number') {
                    var step = $scope.headerBackOptions.step;
                    $scope.headerBackOptions = {};
                    window.history.go(step);
                    return 'back with step.';
                }
            } else {
                window.history.go(-1);
            }
        };
        /**
         * Refresh the page
         */
        $scope.refresh = function () {
            window.location.reload();
        };

        $scope.share = function(){
            console.log('share!');
        };
        /**
         * Click the other right operate fn
         */
        $scope.clickOtherRightOperate = function () {
            if ($scope.defaults.otherRightOperate.clickCall && typeof $scope.defaults.otherRightOperate.clickCall === 'function') {
                $scope.defaults.otherRightOperate.clickCall();
            }
        };
        $scope.clickTitleOperate = function () {
            if ($scope.defaults.titleOperate.clickCall && typeof $scope.defaults.titleOperate.clickCall === 'function') {
                $scope.defaults.titleOperate.clickCall();
            }
        };
        /**
         * control the areas show or hide
         * @type {boolean}
         */
        $scope.showAreas = false;
        $scope.currentArea = helper.isEmptyObject($scope.defaults.areaOperate.currentArea) ? $scope.defaults.areaOperate.areas.hot[0] : $scope.defaults.areaOperate.currentArea;
        $scope.showAreaList = function () {
            $scope.showAreas = !$scope.showAreas;
        };

        //init the area
        $scope.hotCity = $scope.defaults.areaOperate.areas.hot;
        var formatRes = formatCityList($scope.defaults.areaOperate.areas.all);
        $scope.allCity = formatRes.cityArray;
        $scope.letterNavList = formatRes.letterArray;

        if($scope.defaults.areaOperate.enable){
            var headAreaFilter = new IScroll('#headAreaFilter', {
                click: true
            });
            setInterval(function () {
                headAreaFilter.refresh();
            }, 300);
            $scope.scrollToLetter = function(item){
                var ele = document.getElementById(item);
                headAreaFilter.scrollToElement(ele);
            };
        }

        //select the current area, change the areas list hidden & set the $scope.currentArea.
        $scope.selectCity = function (item) {
            if(item.type !== 'tag'){
                $scope.currentArea = item;
                $scope.showAreas = false;
            }
        };
        //watch the currentArea. If changed, send broadcast to the page.
        $scope.$watch('currentArea', function (n, o) {
            var selectedCallback = $scope.defaults.areaOperate.selectedCall;
            if (selectedCallback && typeof selectedCallback === 'function') {
                selectedCallback($scope.currentArea);
            }
        });

        function formatCityList(objArea) {
            var tempArray = [];
            var letterArray = [];
            for (var i = 0; i < objArea.length; i++) {
                tempArray.push({
                    city: objArea[i].letter,
                    id: objArea[i].letter,
                    type: 'tag'
                });
                letterArray.push(objArea[i].letter);
                for (var j = 0, list = objArea[i].list; j < list.length; j++) {
                    tempArray.push(list[j]);
                }
            }
            return {
                letterArray: letterArray,
                cityArray: tempArray
            };
        }

        /**
         * control the tab widget
         */
        $scope.currentTab = $scope.defaults.tabOperate.currentTab;
        $scope.clickHeaderTab = function (item, index) {
            $scope.currentTab = index;
        };
        $scope.$watch('currentTab', function(n, o) {
            var selectedCallback = $scope.defaults.tabOperate.selectedCall;
            if (selectedCallback && typeof selectedCallback === 'function') {
                selectedCallback($scope.defaults.tabOperate.options[$scope.currentTab], $scope.currentTab);
            }
        });
    }];
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        controller: ctrl,
        templateUrl: "template/header.html",
        scope: {},
        link: function () {

        }
    }
}]);
app.run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/header.html',
        '<header class="layout-header {{defaults.otherThemeClass}}" id="layoutHeader" ng-show="defaults.enableHeader">\
        <div class="header {{defaults.otherClass}}">\
       <div class="left-operate">\
           <div class="btn-back" ng-show="defaults.enableBack" ng-click="goBack()">\
               <div class="iconfont icon-back"></div>\
           </div>\
           <div class="btn-close" ng-show="defaults.enableClose" ng-click="closeHeader()"></div>\
       </div>\
       <div class="title" ng-bind="defaults.title" ng-show="defaults.enableTitle" ng-click="clickTitleOperate()" ng-bind-html="defaults.titleOperate.html | trustAsHtml"></div>\
       <div class="header-tab" ng-show="defaults.tabOperate.enableTab && !defaults.enableTitle">\
            <div class="tab-options" ng-class="{\'active\':currentTab == $index}" ng-repeat="tabItem in defaults.tabOperate.options track by $index" ng-bind="tabItem.name" ng-click="clickHeaderTab(tabItem, $index)"></div>\
       </div>\
       <div class="right-operate">\
           <div class="btn-refresh" ng-show="defaults.enableRefresh" ng-click="refresh()"></div>\
           <div class="btn-share" ng-show="defaults.enableShare" ng-click="share()"><i class="iconfont icon-share"></i></div>\
           <div class="other-right-operate" ng-show="defaults.otherRightOperate.enable" ng-click="clickOtherRightOperate()" ng-bind-html="defaults.otherRightOperate.html | trustAsHtml"></div>\
           <div class="select-area" ng-show="defaults.areaOperate.enable">\
                <div class="current-area" ng-click="showAreaList()"><span class="current-area-text" ng-bind="currentArea[defaults.areaOperate.trackKey]"></span><span class="select-icon" ng-class="{true:\'triangle-up\', false: \'triangle-down\'}[showAreas]"></span></div>\
                <div class="all-area-box" ng-show="showAreas">\
                   <div class="wrap" id="headAreaFilter">\
                        <div class="scroll">\
                            <ul>\
                                <li class="hot">\
                                    <p>热门城市</p>\
                                    <div class="item-box">\
                                    <div class="hot-item" ng-repeat="item in hotCity"><span ng-class="{\'active\':(currentArea.city==item.city&&currentArea.id==item.id)}" ng-bind="item.city" ng-click="selectCity(item)"></span></div>\
                                    </div>\
                                </li>\
                                <li class="usual" ng-class="{\'tag\':item.type === \'tag\',\'active\':(currentArea.city==item.city&&currentArea.id==item.id)}" ng-repeat="item in allCity" id="{{item.id}}" ng-bind="item.city" ng-click="selectCity(item)"></li>\
                            </ul>\
                        </div>\
                    </div>\
                    <div class="letter-nav">\
                        <div class="nav" ng-repeat="item in letterNavList" ng-bind="item" ng-click="scrollToLetter(item)"></div>\
                    </div>\
                </div>\
           </div>\
       </div>\
       </div>\
       </header>');
}]);