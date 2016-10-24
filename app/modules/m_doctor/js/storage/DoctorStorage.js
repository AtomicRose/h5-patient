app.factory('DoctorStorage', ['ngStorage', function (ngStorage) {
    var doctor_tab_storage = ngStorage.sessionStorage('doctor_tab_storage');
    var disease_storage = ngStorage.sessionStorage('disease_storage');
    var area_hospital_level_storage = ngStorage.sessionStorage('area_hospital_level_storage');
    return {
        DOCTOR_TAB_STORAGE: doctor_tab_storage,
        DISEASE_STORAGE: disease_storage,
        AREA_HOSPITAL_LEVEL_STORAGE: area_hospital_level_storage
    };
}]);