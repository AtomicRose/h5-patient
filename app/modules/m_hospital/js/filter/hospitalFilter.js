app.filter('departmentIcon', [function(){
    return function(departmentName){
        switch (departmentName){
            case '内科':{
                return "http://static.mingyizhudao.com/146302535750635";
            }
            case '外科':{
                return "http://static.mingyizhudao.com/146302539369261";
            }
            case　'妇产科': {
                return "http://static.mingyizhudao.com/146302542491035";
            }
            case '骨科':{
                return "http://static.mingyizhudao.com/146302546159954";
            }
            case '小儿外科':{
                return "http://static.mingyizhudao.com/146303115932864";
            }
            case '五官科': {
                return "http://static.mingyizhudao.com/146303121523753";
            }
            default: {
                return "http://static.mingyizhudao.com/146302535750635";
            }
        }
    }
}]);