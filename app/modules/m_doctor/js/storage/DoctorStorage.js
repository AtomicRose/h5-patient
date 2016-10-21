app.factory('DoctorStorage', ['ngStorage', function (ngStorage) {
    var doctor_tab_storage = ngStorage.sessionStorage('doctor_tab_storage');
    var disease_storage = ngStorage.sessionStorage('disease_storage');
    return {
        DOCTOR_TAB_STORAGE: doctor_tab_storage,
        DISEASE_STORAGE: disease_storage
    };
}]);