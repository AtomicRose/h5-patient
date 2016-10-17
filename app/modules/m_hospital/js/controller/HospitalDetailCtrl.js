app.controller('HospitalDetailCtrl', ['$rootScope', '$scope', 'dialog', '$stateParams', 'HospitalService', '$state', function ($rootScope, $scope, dialog, $stateParams, HospitalService, $state) {

    /**
     * control the tab checked
     * @type {number}
     */
    $scope.isFilter = false;
    $scope.selectedTab = 0;
    $scope.checkTab = function (index) {
        if ($scope.selectedTab == index) {
            return false;
        }
        $scope.selectedTab = index;
    };

    function openFilter(){
        $scope.isFilter = !$scope.isFilter;
        $scope.isFilteryx = 0;
        $scope.isFilterxs=0;
    }

    $scope.confirmFilter = function(){
        openFilter();
    }

    $scope.clickFilter = function(_isFilteryx,_isFilterxs){
        if (!_isFilteryx&&!_isFilterxs) {
            document.getElementsByClassName('other-right-operate')[0].className = 'other-right-operate ng-binding';
        }else{
            document.getElementsByClassName('other-right-operate')[0].className = 'other-right-operate ng-binding filtered';
        }
    }

    function getDeptDescription(_depObj){
        var _deps = _depObj;
        var _depsArray = [];
        var urlOptions = {
            departmentId: ''
        };
        for (dep in _deps){
            _depsArray = _depsArray.concat(_deps[dep]);
        }
        for(var i = 0; i<_depsArray.length; i++){
            if(_depsArray[i].name == $stateParams.hospitalDeptName){
                urlOptions.departmentId = _depsArray[i].id;
            }
        }
        var spinner = dialog.showSpinner();
        HospitalService.getDepartmentInfo({}, urlOptions).then(function (res) {
            $scope.departmentInfo = res.results.department;
            $scope.dtList = [{dt:0},{dt:0},{dt:0},{dt:0}];
            window.headerConfig.title = res.results.department.name;
            window.headerConfig.otherRightOperate= {
                enable: true,
                html: '筛选',
                clickCall: openFilter
            }
            $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
            dialog.closeSpinner(spinner.id);
        }, function (res) {
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }

    var spinner = dialog.showSpinner();
    var params = {};
    var urlOptions = {
        id: $stateParams.hospitalId
    };
    HospitalService.getHospitalDetail(params, urlOptions).then(function (res) {
        dialog.closeSpinner(spinner.id);
        $scope.hospitalInfo = res.results;
        window.headerConfig = {
            enableHeader: true,
            enableBack: true,
            enableRefresh: false,
            title: $stateParams.hospitalDeptName
        };
        $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
        //获取科室信息
        getDeptDescription(res.results.departments);
    }, function (res) {
        dialog.closeSpinner(spinner.id);
        dialog.alert(res.errorMsg);
    });

    // $scope.goDepartment = function (hospital, department) {
    //     // console.log('department',department);
    //     // console.log(hospital);
    //     // console.log(department);
    //     $state.go('layout.department',{
    //         departmentId: department.id,
    //         hospitalId: hospital.id,
    //         departmentId: department.id,
    //         departmentName: department.name,
    //         hospitalName: hospital.name
    //     });
    // };
}]);