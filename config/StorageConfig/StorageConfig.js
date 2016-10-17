app.factory('StorageConfig', ['ngStorage', function (ngStorage) {
    //定义了common的localStorage，可以放入app公用的一些数据。注意：此数据会不会因为浏览器关闭而删除，不得放入敏感数据
    var common_storage = ngStorage.localStorage('myzd_common_storage');
    //默认token的sessionStorage，用来存放当前的token。用户关闭浏览器后即删除
    var session_token = ngStorage.sessionStorage('myzd_session_token');
    //底部菜单按钮本地session记录
    var footer_storage = ngStorage.sessionStorage('myzd_footer');
    //临时存储城市等数据
    var city_storage = ngStorage.sessionStorage('myzd_city');
    //临时存储发现页中的tab状态
    var find_storage = ngStorage.sessionStorage('myzd_find');
    //存储预约信息（医生，科室，快速，企业）
    var booking_storage = ngStorage.sessionStorage('myzd_booking');
    //存储科室信息
    var dept_storage = ngStorage.sessionStorage('myzd_dept');
    return {
        COMMON_STORAGE: common_storage,
        FOOTER_STORAGE: footer_storage,
        TOKEN_STORAGE: session_token,
        CITY_STORAGE: city_storage,
        FIND_STORAGE: find_storage,
        BOOKING_STORAGE: booking_storage,
        DEPT_STORAGE: dept_storage
    };
}]);