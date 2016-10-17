app.factory('CMSDataConfig', ['StorageConfig', '$state', function (StorageConfig, $state) {
    var data = {};
    data.orderStatus = [
        {
            type : 1,
            text : '待支付'
        },
        {
            type : 2,
            text : '安排中'
        },
        {
            type : 5,
            text : '待确认'
        },
        {
            type : 6,
            text : '待评价'
        },
        {
            type : 9,
            text : '已取消'
        }
    ];
    
    data.appMenus = [
        {
            text: '我的预约单',
            class: 'icon-edit',
            route: 'layout.order'
        },
        {
            text: '历史浏览',
            class: 'icon-clock',
            route: 'history'
        },
        {
            text: '常见问题',
            class: 'icon-question',
            route: 'problem'
        },
        {
            text: '联系客服',
            class: 'icon-phone',
            route: ''
        },
        {
            text: '关于我们',
            class: 'icon-warning',
            route: 'about'
        },
        {
            text: '设置',
            class: 'icon-setting',
            route: 'setting'
        }
    ];
    return data;
}]);