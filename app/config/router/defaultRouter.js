app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/layout/home');
    $urlRouterProvider.when('/layout', '/layout/home');
    $stateProvider
        .state('test', {
            url: '/test',
            templateUrl: 'app/modules/m_test/view/index.html'
        })
        .state('layout', {
            url: '/layout',
            templateUrl: 'app/modules/m_layout/view/index.html'
        })
        .state('layout.home',{
            url: '/home',
            templateUrl: 'app/modules/m_home/view/index.html'
        })
        .state('layout.hospital',{
            url: '/hospital',
            templateUrl: 'app/modules/m_hospital/view/index.html'
        })
        .state('layout.hospitalRank',{
            url: '/hospital/rank',
            templateUrl: 'app/modules/m_hospital/view/hospital-rank.html'
        })
        .state('layout.search-hospital',{
            url: '/search/hospital?diseasesId&deptId',
            templateUrl: 'app/modules/m_hospital/view/search-hospital.html'
        })
        .state('layout.hospital-detail', {
            url: '/hospital/:hospitalId',
            templateUrl: 'app/modules/m_hospital/view/hospital-detail.html'
        })
        .state('layout.department', {
            url: '/hospital/:hospitalId/:departmentId?departmentName&hospitalName',
            //url: '/hospital/booking/:departmentId',
            templateUrl: 'app/modules/m_hospital/view/department.html'
        })
        .state('layout.booking-department', {
            url: '/booking/department/:hospitalId/:departmentId?departmentName&hospitalName',
            templateUrl: 'app/modules/m_booking/view/booking-department.html'
        })
        .state('layout.booking-doctor', {
            url: '/booking/doctor/:doctorId?doctorName&departmentName&hospitalName',
            templateUrl: 'app/modules/m_booking/view/booking-doctor.html'
        })
        .state('layout.operation-train', {
            url: '/booking/operation',
            templateUrl: 'app/modules/m_booking/view/operation-train.html'
        })
        .state('layout.booking-quick', {
            url: '/booking/quick',
            templateUrl: 'app/modules/m_booking/view/booking-quick.html'
        })
        .state('layout.find', {
            url: '/find',
            templateUrl: 'app/modules/m_find/view/index.html'
        })
        .state('layout.find-detail', {
            url: '/find/:storyName',
            templateUrl: 'app/modules/m_find/view/findingDetail.html'
        })
        .state('layout.me', {
            url: '/me',
            templateUrl: 'app/modules/m_me/view/index.html'
        })
        .state('layout.problems', {
            url: '/me/problems',
            templateUrl: 'app/modules/m_me/view/problems.html'
        })
        .state('layout.aboutus', {
            url: '/me/aboutus',
            templateUrl: 'app/modules/m_me/view/aboutus.html'
        })
        .state('layout.mygy', {
            url: '/me/mygy',
            templateUrl: 'app/modules/m_me/view/mygy.html'
        })
        .state('layout.login', {
            url: '/login?redirectUri&redirectRoute&backRoute&backUrl&goBack&backHash&redirectHash',
            templateUrl: 'app/modules/m_login/view/login.html'
        })
        .state('layout.password-forgot', {
            url:'/password/forgot',
            templateUrl: 'app/modules/m_login/view/passwordForgot.html'
        })
        .state('layout.register', {
            url: '/register?redirectUri&redirectRoute&backRoute&backUrl',
            templateUrl: 'app/modules/m_register/view/register.html'
        })
        .state('layout.search',{
            url: '/search',
            templateUrl: 'app/modules/m_search/view/index.html'
        })
        .state('layout.searchMore',{
            url: '/search/more',
            templateUrl: 'app/modules/m_search/view/searchMove.html'
        })
        .state('layout.doctor',{
            url: '/doctor?diseasesId',
            templateUrl: 'app/modules/m_doctor/view/index.html'
        })
        .state('layout.doctor-detail', {
            url: '/doctor/:doctorId',
            templateUrl: 'app/modules/m_doctor/view/doctor-detail.html'
        })
        .state('layout.orders', {
            url: '/me/orders/:orderType',
            templateUrl: 'app/modules/m_me/view/orders.html'
        })
        .state('layout.order', {
            url: '/order/:bookingId',
            templateUrl: 'app/modules/m_pay/view/order.html'
        })
        .state('layout.orderDetail', {
            url: '/order/detail/:bookingId',
            templateUrl: 'app/modules/m_me/view/orderDetail.html'
        })


        .state('layout.aboutLogin', {
            url: '/me/problems/aboutLogin',
            templateUrl: 'app/modules/m_me/view/problems/aboutLogin.html'
        })
        .state('layout.aboutBooking', {
            url: '/me/problems/aboutBooking',
            templateUrl: 'app/modules/m_me/view/problems/aboutBooking.html'
        })
        .state('layout.aboutCost', {
            url: '/me/problems/aboutCost',
            templateUrl: 'app/modules/m_me/view/problems/aboutCost.html'
        })
        .state('layout.aboutPlatform', {
            url: '/me/problems/aboutPlatform',
            templateUrl: 'app/modules/m_me/view/problems/aboutPlatform.html'
        })
        .state('layout.aboutAgreement', {
            url: '/me/problems/aboutAgreement',
            templateUrl: 'app/modules/m_me/view/problems/aboutAgreement.html'
        })
}]);