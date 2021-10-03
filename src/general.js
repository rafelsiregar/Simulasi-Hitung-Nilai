
//Mengolah Alert

const Error = {
    errorAlert : () => alert("Mohon maaf, ada kesalahan dalam input data"),
    unfilledAlert : () =>alert("Mohon maaf, data harus diisi")
};

const HiddenState = {
    openHidden : (id) =>document.getElementById(id).hidden=false,
    closeHidden : (id) => document.getElementById(id).hidden=true
};


function getSchool(id, schoolIndex){
    document.getElementsByName(id).innerHTML = 
    document.getElementsByName("school")[schoolIndex].value;
}

function getValue(id, variable){
    document.getElementById(id).innerHTML =
    variable;
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

function noOutOfRange(element, lowRange, highRange){
    for(var i=0;i<element.length;i++){
        if(element[i]<0 || element[i]>100 || element[i]==""){
            return false;
        }
    }
    return true;
}




