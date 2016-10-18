(function(){
    if(window.innerWidth<375){
        window.rem = 10;
    }
    if(window.innerWidth<414&&window.innerWidth>=375){
        window.rem = 12;
    }
    if(window.innerWidth<600&&window.innerWidth>=414){
        window.rem = 14;
    }
    if(window.innerWidth>=600){
        window.rem = 16;
    }
})();