app.controller('FindCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'StorageConfig', function ($scope, $rootScope, $state, $stateParams, StorageConfig) {
    var storageTab = StorageConfig.FIND_STORAGE.getItem('findTab');
    $scope.tabSelected = storageTab || 0;
    window.headerConfig = {
        enableHeader: true,
        enableBack: false,
        title: '发现',
        enableTitle: false,
        enableRefresh: false,
        tabOperate: {
            enableTab: true,
            options: [
                {
                    name: '手术专题',
                    id: '0'
                },
                {
                    name: '名医故事',
                    id: '1'
                }
            ],
            currentTab: $scope.tabSelected,
            selectedCall: selectedTab
        }
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    if ($stateParams.storyName) {
        window.headerConfig = {
            enableHeader: false
        };
        window.footerConfig = {
            enableFooter: false
        };
        $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
        $rootScope.$broadcast('setFooterConfig', window.footerConfig);

        // var frameHeight = document.getElementById('layoutContent').clientHeight;
        // var centent = document.getElementsByClassName('find-story-page')[0];
        // var iframe = document.getElementById('iframe');
        // centent.style.height = frameHeight+'px';
        iframe.src = 'http://wap.dev.mingyizd.com/mobile/event/view-page-' + $stateParams.storyName + '.html';
    }

    function selectedTab(item, index) {
        $scope.tabSelected = index;
        document.getElementById('layoutContent').scrollTop = 0;
        StorageConfig.FIND_STORAGE.putItem('findTab', index);
    }

    $scope.topicsList = [
        {
            src: 'catherine',
            imgUrl: 'http://static.mingyizhudao.com/146529036735212'
        },
        {
            src: 'internetOperation',
            imgUrl: 'http://static.mingyizhudao.com/146529829828030'
        },
        {
            src: 'cancer',
            imgUrl: 'http://static.mingyizhudao.com/146353686584387'
        },
        {
            src: 'lungCancer',
            imgUrl: 'http://static.mingyizhudao.com/146348338505141'
        },
        {
            src: 'shapingHealth',
            imgUrl: 'http://static.mingyizhudao.com/14630233122529'
        },
        {
            src: 'mygy',
            imgUrl: 'http://static.mingyizhudao.com/146302377992350'
        }
    ];

    $scope.storiesList = [
        {
            src: 'loveOperation',
            imgUrl: 'http://static.mingyizhudao.com/147313181236776',
            title: '名医公益行，潍坊爱心手术！'
        },
        {
            src: 'lifeExpect',
            imgUrl: 'http://static.mingyizhudao.com/147186370045038',
            title: '他说，活下去的希望是你们给的！'
        },
        {
            src: 'repeatCustomers',
            imgUrl: 'http://static.mingyizhudao.com/147090011817137',
            title: '手术还有“回头客”'
        },
        {
            src: 'operation',
            imgUrl: 'http://static.mingyizhudao.com/147064363369322',
            title: '小政政做手术准备当男孩'
        },
        {
            src: 'life',
            imgUrl: 'http://static.mingyizhudao.com/146959849335388',
            title: '同病不同命'
        },
        {
            src: 'tick',
            imgUrl: 'http://static.mingyizhudao.com/14695984486620',
            title: '身首异处的蜱虫，你威风啥'
        }
    ];

    $scope.goDetailUrl = function (_url) {
        console.log('_url', _url);
        $state.go('layout.find-detail', {
            storyName: _url
        })
    };
}]);