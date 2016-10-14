app.controller('DepartmentCtrl', ['$rootScope', '$scope', 'dialog', '$stateParams', 'HospitalService', '$state', function ($rootScope, $scope, dialog, $stateParams, HospitalService, $state) {
    window.headerConfig = {
        enableHeader: true,
        enableBack: true,
        enableRefresh: true,
        title: $stateParams.departmentName
    };
    $rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    $scope.showProgressBox = false;
    $scope.ctrlProgressBox = function () {
        $scope.showProgressBox = !$scope.showProgressBox;
    };
    /**
     * get the department description by hospital's id & department's id.
     */
    var spinner = dialog.showSpinner();
    var params = {};
    var urlOptions = {
        // hospitalId: $stateParams.hospitalId,
        departmentId: $stateParams.departmentId
    };
    HospitalService.getDepartmentInfo(params, urlOptions).then(function (res) {
        $scope.departmentInfo = res.results.department;
        window.headerConfig.title = res.results.department.name;
        $rootScope.$broadcast('setHeaderConfig', window.headerConfig);
        dialog.closeSpinner(spinner.id);
    }, function (res) {
        dialog.closeSpinner(spinner.id);
        dialog.alert(res.errorMsg);
    });

    $scope.bookDepartment = function () {
        $state.go('layout.booking-department', {
            hospitalId: $stateParams.hospitalId,
            departmentId: $stateParams.departmentId,
            hospitalName: $stateParams.hospitalName,
            departmentName: $stateParams.departmentName
        });
    };

}]);