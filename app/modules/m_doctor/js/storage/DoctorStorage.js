app.factory('DoctorStotage', ['ngStorage', function (ngStorage) {
    var doctor_tab_storage = ngStorage.sessionStorage('doctor_tab_storage');
    return {
        DOCTOR_TAB_STORAGE: doctor_tab_storage
    };
}]);