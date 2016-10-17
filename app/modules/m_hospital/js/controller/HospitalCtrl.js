app.controller('HospitalCtrl', ['$scope', '$rootScope', 'CommonService', 'dialog', 'StorageConfig', 'HospitalService','$state', '$stateParams', 'DoctorService', function ($scope, $rootScope, CommonService, dialog, StorageConfig, HospitalService, $state, $stateParams, DoctorService) {
    var defaultAllCity = {city: '全国', id: 0, is_hot: 0};
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: false,
        title: '最佳医院',
        areaOperate: {
            enable: true,
            areas: StorageConfig.CITY_STORAGE.getItem('hospitalCities') ? StorageConfig.CITY_STORAGE.getItem('hospitalCities') : defaultAllCity,
            trackKey: 'city',
            currentArea: StorageConfig.CITY_STORAGE.getItem('hospitalCityCurrent') ? StorageConfig.CITY_STORAGE.getItem('hospitalCityCurrent') : {
                city: '全国',
                id: 0,
                is_hot: 0
            },
            selectedCall: function (item) {
                selectedCityCall(item);
            }
        }
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);


    //If not find the cities info in the sessionStorage. It should request the service to get them.
    if (!(StorageConfig.CITY_STORAGE.getItem('hospitalCities') && StorageConfig.CITY_STORAGE.getItem('hospitalCities').length)) {
        requestGetCities();
    }
    var defaultParams = {
        city: 0,
        disease_sub_category: 101
    };

    //  初始化获取科室列表
    function getDeptList(){
        if (StorageConfig.DEPT_STORAGE.getItem('detpList')) {
            $scope.deptList = StorageConfig.DEPT_STORAGE.getItem('detpList');
            $scope.selectedDeptId = StorageConfig.DEPT_STORAGE.getItem('curDetpId');
            defaultParams.disease_sub_category = $scope.selectedDeptId;
            selectedCall();
        }
        else{
            DoctorService.getDetpList().then(
                function(res){
                    StorageConfig.DEPT_STORAGE.putItem('detpList',res.results);
                    $scope.deptList = res.results;
                    $scope.selectedDeptId = $scope.deptList[0].id;
                    defaultParams.disease_sub_category = $scope.selectedDeptId;
                    selectedCall();
                },
                function(res){
                    console.log('err',res);
                }
            );
        }
    }

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
                    selectedCityCall(item);
                }
            };
            window.headerConfig.areaOperate = areaOperateObj;
            $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
        }, function (res) {
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }

    $scope.goToDetail = function(item){
        $state.go('layout.hospital-detail', {
            hospitalId: item.hospital_id
        });
    };

    $scope.goRouter = function(_router){
        $state.go('layout.hospitalRank');
    }

    $scope.clickNav = function(_id){
        if($scope.selectedDeptId != _id){
            $scope.selectedDeptId = _id;
            defaultParams.disease_sub_category = _id;
            StorageConfig.DEPT_STORAGE.putItem('curDetpId',_id);
            selectedCall();
        }
    }

    /**
     * the function about how to request get cities.
     */
    function selectedCityCall(item){
        defaultParams.city= item.id;
        StorageConfig.CITY_STORAGE.putItem('hospitalCityCurrent', item);
        // selectedCall();

        getDeptList();
    }

    function selectedCall() {
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