app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/doc/home');
    $urlRouterProvider.when('/doc', '/doc/home');
    $stateProvider
        .state('doc', {
            url: '/doc',
            templateUrl: 'doc/modules/m_layout/view/index.html'
        })
        .state('doc.home',{
            url: '/home',
            templateUrl: 'doc/modules/m_home/view/index.html'
        })
        //style
        .state('doc.style',{
            url: '/style',
            templateUrl: 'doc/modules/m_style/view/index.html'
        })
        .state('doc.style-form', {
            url: '/style/form',
            templateUrl: 'doc/modules/m_style/view/form.html'
        })
        .state('doc.style-logo', {
            url: '/style/logo',
            templateUrl: 'doc/modules/m_style/view/logo.html'
        })
        .state('doc.widget', {
            url: '/widget',
            templateUrl: 'doc/modules/m_widget/view/index.html'
        })
        //弹出框
        .state('doc.dialog', {
            url: '/dialog',
            templateUrl: 'doc/modules/m_widget/view/dialog.html'
        })
        //横向滚动
        .state('doc.landscapeScroll', {
            url: '/landscapeScroll',
            templateUrl: 'doc/modules/m_widget/view/landscapeScroll.html'
        })
        //图片上传
        .state('doc.uploadImg', {
            url: '/uploadImg',
            templateUrl: 'doc/modules/m_widget/view/uploadImg.html'
        })
}]);