app.factory('ValidationLog', [function(){
    var ValidationLog = function(){
        this.init = function(){
            var e = document.createElement('div');
            e.className = 'validate-log';
            e.innerHTML = '<table id="validateLogTable"></table>';
            document.body.appendChild(e);
        };
        this.append = function(str){
            if(!document.getElementById('validateLogTable')){
                this.init();
            }
            var container = document.getElementById('validateLogTable');
            var tr = document.createElement('tr');
            tr.innerHTML = '<td>'+str+'</td>';
            container.appendChild(tr);
            setTimeout(function(){
                tr.remove();
            },1500);
            if(container.childNodes.length > 3){
                container.childNodes[0].remove();
            }
        };
    };
    return new ValidationLog();
}]);