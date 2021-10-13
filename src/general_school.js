function getSchool(id, schoolIndex){
    $('#'+id).val($("input[name='school']").eq(schoolIndex).val())
    
}

function getValue(id, variable){
    $('#'+id).html(variable);
}


function getElement(element, index){
    var manipulate = [];
    
    for(var i=0;i<element.length;i++){
        //console.log(document.getElementsByName(element[i])[index].value);
        manipulate.push(document.getElementsByName(element[i])[index].value);
        console.log(manipulate[i]);
    }
    return manipulate;
}







