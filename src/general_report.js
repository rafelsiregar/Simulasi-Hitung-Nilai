//Mengolah Alert
function errorAlert(){alert("Mohon maaf, ada kesalahan dalam input data");}
function unfilledAlert(){alert("Mohon maaf, data harus diisi");}


//Mengolah hidden
function openHidden(id) {document.getElementById(id).hidden=false};
function closeHidden(id){document.getElementById(id).hidden=true};

//Function yang akan digunakan
var input = document.getElementById("input_aspek");
var aspect = document.getElementsByClassName("ket_aspek");
var button = document.getElementById("add_addit"); 
var confirm = document.getElementById("confirm");


//Pointer untuk aspek tambahan
var additional = [];

//Mengkonstruksi pointer
function construct_pointer(obj){
    return obj;
}


//Untuk menjalankan fungsi JQuery
$(document).ready(function(){
    
    $('#add_tugas').click(function(){
        pointer['tugas']++;
        $('#info_tugas').append(generateTaskText(pointer['tugas']));
        checkPointer();
    })

    $('#sub_tugas').click(function(){
        console.log(pointer['tugas'])
        console.log($('#tugas_ke_'+(pointer['tugas'])).html())
        $('#tugas_ke_'+(pointer['tugas'])).remove();
        pointer['tugas']--;
        checkPointer();
    })    

    

    $('#add_addit').click(function(){

        toggleButton();
        
        //Kalau udah menginput aspeknya
        $("#input_aspek").keyup(function(e) {
            if(e.keyCode == 13 && $(this).val()!=="") {
                    e.preventDefault();
                    $("#add_element").click() 
            }
        });
    })

    $("#add_element").click(function(){
        var val = $("#input_aspek").val();
        //Generate Aspek
        if(!additional.includes(val))
        $('#info_addit').append(generateAdditionalText(val));
        else alert("Aspek sudah ada");
        //Mengembalikan button ke tempat semula
        toggleButton();
        $("#input_aspek").val("");
    })


    $('#enable_addition').click(function(){
        var id = $(this).attr('id');
        var aspek = document.getElementsByClassName("aspek");
        if($(`#${id}`).is(':checked')){
            for(var i=0;i<aspek.length;i++){
                aspek[i].disabled = false;
                
            }
        } else {
            for(var i=0;i<aspek.length;i++){
                aspek[i].disabled = true;
                aspek[i].value="";
            }
            returnToDefault();
        }
    });
});

function changeButton(){
    button.className = button.className.replace(/col-sm-6/g, "col-sm-2");
    confirm.style.display="inline";
    button.innerHTML = "Batal Menambah Aspek";
}


function returnToDefault(){
    button.className = button.className.replace(/col-sm-2/g, "col-sm-6");
    confirm.style.display="none";
    button.innerHTML = "Tambah Aspek";
}

function toggleButton(){
    //Mengecilkan button
    if(button.className.match(/col-sm-6/g)){
        changeButton();
    } else if(button.className.match(/col-sm-2/g)){
        returnToDefault();
    }
}

function removeElement(element, array){
    var index = array.indexOf(element);
    if (index !== -1) {
    array.splice(index, 1);
    }
}


function removeAspect(aspek){
    $("#aspek_"+(aspek.toLowerCase().replace(" ", "_"))).remove();
    removeElement(aspek, additional);
}

function generateAdditionalText(aspek){
    additional.push(aspek);
    console.log(aspek.toLowerCase().replace(" ", "_"))
    return `<div class="data_addit" id="aspek_${aspek.toLowerCase().replace(" ", "_")}">
         <p> ${aspek} </p>
         <div class="form-row data_aspek">
         <div class="form-group col-sm-2">
             <input type="number" class="aspek nilai_aspek form-control input-sm "
             id= "nilai_aspek_${aspek.toLowerCase().replace(" ", "_")}"  placeholder="Nilai" min="1">
         </div>
         <div class="form-group col-sm-2">
             <input type="number" class="aspek bobot_aspek form-control input-sm"  
             id="bobot_aspek_${aspek.toLowerCase().replace(" ", "_")}" placeholder="Bobot" min="1">
         </div>
         <div class="form-group col-sm-2">
            <button type="button" style="margin-top : 0px;" id="remove_aspek_${aspek.toLowerCase().replace(" ", "_")}" 
            class="btn btn-secondary aspek" onclick = "removeAspect('${aspek}') style='margin-top:0;'" >
            Hapus Aspek </button>
         </div>
       </div>
       </div>`
}


