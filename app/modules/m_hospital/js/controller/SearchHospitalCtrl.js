app.controller('SearchHospitalCtrl', ['$scope', '$rootScope', 'dialog', 'StorageConfig', 'HospitalService','$state', '$stateParams', 'CommonService', function ($scope, $rootScope, dialog, StorageConfig, HospitalService, $state, $stateParams, CommonService) {

    var defaultAllCity = {city: '全部', id: 0, is_hot: 0};
    
    var defaultParams = {
        city: 0
    };
    if($stateParams.diseasesId!=undefined){
        defaultParams.disease = $stateParams.diseasesId;
        var urlOptions = {id:$stateParams.diseasesId};
        HospitalService.getDiseasesById(urlOptions).then(function(res){
            window.headerConfig = {
                enableHeader: true,
                enableBack: true,
                enableRefresh: false,
                title: res.results.disease.name,
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
        },function(res){
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }
    if($stateParams.deptId != undefined){
        defaultParams.disease_sub_category = $stateParams.deptId;
        var urlOptions = {id:$stateParams.deptId};
        HospitalService.getSubcategoryById(urlOptions).then(function(res){
            window.headerConfig = {
                enableHeader: true,
                enableBack: true,
                enableRefresh: false,
                title: res.results.catName,
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
        },function(res){
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }

    //If not find the cities info in the sessionStorage. It should request the service to get them.
    if (!(StorageConfig.CITY_STORAGE.getItem('hospitalCities') && StorageConfig.CITY_STORAGE.getItem('hospitalCities').length)) {
        requestGetCities();
    }

    $scope.goToDetail = function(item){
        $state.go('layout.hospital-detail', {
            hospitalId: item.hospital_id
        });
    };

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
    
        defaultParams.city= item.id
        StorageConfig.CITY_STORAGE.putItem('hospitalCityCurrent', item);
        var spinner = dialog.showSpinner();
        HospitalService.getHospitalByQuery(defaultParams).then(function(res){
            dialog.closeSpinner(spinner.id);
            if(res.results && res.results.length){
                $scope.hospitalList = res.results;
            }else{
                $scope.hospitalList = [];
                dialog.toast('该地区暂时没有医院哦~');
            }
        },function(res){
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }
}]);