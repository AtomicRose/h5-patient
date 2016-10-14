app.controller('HospitalCtrl', ['$scope', '$rootScope', 'CommonService', 'dialog', 'StorageConfig', 'HospitalService','$state', '$stateParams', function ($scope, $rootScope, CommonService, dialog, StorageConfig, HospitalService, $state, $stateParams) {
    var defaultAllCity = {city: '全部', id: 0, is_hot: 0};
    window.headerConfig = {
        enableHeader: true,
        enableBack: $stateParams.diseasesId?true:false,
        enableRefresh: false,
        title: '推荐',
        areaOperate: {
            enable: true,
            areas: StorageConfig.CITY_STORAGE.getItem('hospitalCities') ? StorageConfig.CITY_STORAGE.getItem('hospitalCities') : defaultAllCity,
            trackKey: 'city',
            currentArea: StorageConfig.CITY_STORAGE.getItem('hospitalCityCurrent') ? StorageConfig.CITY_STORAGE.getItem('hospitalCityCurrent') : {
                city: '全部',
                id: 0,
                is_hot: 0
            },
            selectedCall: function (item) {
                selectedCall(item);
            }
        }
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    //If not find the cities info in the sessionStorage. It should request the service to get them.
    if (!(StorageConfig.CITY_STORAGE.getItem('hospitalCities') && StorageConfig.CITY_STORAGE.getItem('hospitalCities').length)) {
        requestGetCities();
    }

    $scope.goToDetail = function(item){
        $state.go('layout.hospital-detail', {
            hospitalId: item.hospital_id
        });
    };

    $scope.goRouter = function(_router){
        $state.go('layout.hospitalRank');
    }

    /**
     * the function about how to request get cities.
     */
    function requestGetCities() {
        var spinner = dialog.showSpinner();
        var params = {
            has_team: 0,
            type: 'hospital'
        };
        CommonService.getCity(params).then(function (res) {
            dialog.closeSpinner(spinner.id);
            var allCities = [defaultAllCity].concat(res.results);
            StorageConfig.CITY_STORAGE.putItem('hospitalCities', allCities);
            var areaOperateObj = {
                enable: true,
                areas: allCities,
                trackKey: 'city',
                currentArea: StorageConfig.CITY_STORAGE.getItem('hospitalCityCurrent') ? StorageConfig.CITY_STORAGE.getItem('hospitalCityCurrent') : defaultAllCity,
                selectedCall: function (item) {
                    selectedCall(item);
                }
            };
            window.headerConfig.areaOperate = areaOperateObj;
            $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
        }, function (res) {
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }

    /**
     * The callback after selected the current city.
     * @param item          //the city object, like this
     * item:{
     *      city: '上海'，
     *      id: 101,
     *      is_hot: 1
     * }
     */
    function selectedCall(item) {
        var spinner = dialog.showSpinner();
        StorageConfig.CITY_STORAGE.putItem('hospitalCityCurrent', item);
        var params = {
            city: item.id
        };
        HospitalService.getHospitalByCity(params).then(function(res){
            dialog.closeSpinner(spinner.id);
            if(res.results && res.results.length){
                $scope.hospitalList = res.results;
            }else{
                dialog.toast('该地区暂时没有医院哦~');
            }
        },function(res){
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }
}]);