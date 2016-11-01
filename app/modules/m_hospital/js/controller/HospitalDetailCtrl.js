app.controller('HospitalDetailCtrl', ['$rootScope', '$scope', 'dialog', '$stateParams', 'HospitalService', '$state', function ($rootScope, $scope, dialog, $stateParams, HospitalService, $state) {

    /**
     * control the tab checked
     * @type {number}
     */
    $scope.isFilter = false;
    $scope.isChangeDept = false;
    $scope.selectedTab = 0;
    $scope.checkTab = function (index) {
        if ($scope.selectedTab == index) {
            return false;
        }
        $scope.selectedTab = index;
    };

    function openFilter() {
        $scope.isFilter = !$scope.isFilter;
        $scope.isChangeDept = false;
        $scope.isFilteryx = $scope.isFilteryx || 0;
        $scope.isFilterxs = $scope.isFilterxs || 0;
    }

    function changedDept() {
        console.log('call title');
        $scope.isChangeDept = !$scope.isChangeDept;
        $scope.isFilter = false;
    }

    $scope.closeAllBox = function (event) {
        var e = event.srcElement || event.target;
        if(e.id === 'hospitalDetailFilter'){
            $scope.isChangeDept = false;
            $scope.isFilter = false;
        }
    };
    $scope.confirmFilter = function () {
        openFilter();
        //TODO add the ajax to request the data by the isFilterxs, isFilteryx, curDeptId
    };

    $scope.clickFilter = function (_isFilteryx, _isFilterxs) {
        $scope.isFilterxs = _isFilterxs;
        $scope.isFilteryx = _isFilteryx;
        if (!_isFilteryx && !_isFilterxs) {
            document.getElementsByClassName('other-right-operate')[0].className = 'other-right-operate ng-binding';
        } else {
            document.getElementsByClassName('other-right-operate')[0].className = 'other-right-operate ng-binding filtered';
        }
    };

    $scope.goDeptById = function (_id) {
        getHospitalInfo(60);//无测试数据，暂时写死
    };

    $scope.goDoc = function (_id) {
        $state.go('layout.doctor-detail', {//无测试数据，暂时写死
            doctorId: 3131
        })
    };

    function getDeptDescription(_depObj) {
        var _deps = _depObj;
        var _depsArray = [];
        var urlOptions = {
            departmentId: $stateParams.departmentId
        };
        for (dep in _deps) {
            _depsArray = _depsArray.concat(_deps[dep]);
        }
        $scope.deptList = _depsArray;
        for (var i = 0; i < _depsArray.length; i++) {
            if (_depsArray[i].name == $stateParams.hospitalDeptName) {
                urlOptions.departmentId = _depsArray[i].id;
                $scope.curDeptId = _depsArray[i].id;
            }
        }
        var spinner = dialog.showSpinner();
        HospitalService.getDepartmentInfo({}, urlOptions).then(function (res) {
            $scope.departmentInfo = res.results.department;
            $scope.dtList = [{dt: 0}, {dt: 0}, {dt: 0}, {dt: 0}];
            // window.headerConfig.title = res.results.department.name;
            // window.headerConfig.titleOperate = {
            //     html: '',
            //     clickCall: changedDept
            // };
            // window.headerConfig.otherRightOperate= {
            //     enable: true,
            //     html: '筛选',
            //     clickCall: openFilter
            // }
            // $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
            dialog.closeSpinner(spinner.id);
        }, function (res) {
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }

    getHospitalInfo($stateParams.hospitalId)
    function getHospitalInfo(_id) {
        console.log('_id', _id);
        var spinner = dialog.showSpinner();
        var params = {};
        var urlOptions = {
            id: _id
        };
        HospitalService.getHospitalDetail(params, urlOptions).then(function (res) {
            dialog.closeSpinner(spinner.id);
            $scope.hospitalInfo = res.results;
            window.headerConfig = {
                enableHeader: true,
                enableBack: true,
                enableRefresh: false
                // title: $stateParams.hospitalDeptName
            };
            window.headerConfig.titleOperate = {
                html: $stateParams.hospitalDeptName + '<span class="select-icon triangle-down"></span>',
                clickCall: changedDept
            };
            window.headerConfig.otherRightOperate = {
                enable: true,
                html: '筛选',
                clickCall: openFilter
            };
            $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
            //获取科室信息
            getDeptDescription(res.results.departments);
        }, function (res) {
            dialog.closeSpinner(spinner.id);
            dialog.alert(res.errorMsg);
        });
    }

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