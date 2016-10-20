app.factory('CMSDataConfig', ['StorageConfig', '$state', 'dialog', function (StorageConfig, $state, dialog) {
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
            type : 8,
            text : '已完成'
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
            route: 'layout.orders'
        },
        {
            text: '历史浏览',
            class: 'icon-clock',
            route: 'layout.history'
        },
        {
            text: '常见问题',
            class: 'icon-question',
            route: 'layout.problems'
        },
        {
            text: '联系客服',
            class: 'icon-phone',
            route: '',
            beforeCall: function(){
                dialog.confirm('立即拨打免费客服热线400-6277-120',{
                    closeCallback: function(value){
                        if(value == 0){
                        }
                        if(value == 1){
                           location.href = 'tel://4006277120';
                        }
                    }
                });  
            }
        },
        {
            text: '关于我们',
            class: 'icon-information',
            route: 'layout.aboutus'
        },
        {
            text: '设置',
            class: 'icon-setting',
            route: 'layout.setting'
        }
    ];
    return data;
}]);