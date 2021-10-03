
import {error, hiddenState} from './general.mjs'

var e = error();
var hs = hiddenState();

var input = document.getElementById("input_state");
var aspect = document.getElementsByClassName("ket_state");
var button = document.getElementById("add_state"); 
var confirm = document.getElementById("confirm");




var state_list = [];



//Jalankan JQuery
$(document).ready(function(){
    $("#info_state").append(generateStateText("Benar"),generateStateText("Salah"), generateStateText("Kosong"));
    
    var state = document.getElementsByClassName("state");
    for(var i=0;i<state.length;i++){
        state[i].value="";
    }

    var forbidden_delete = [
        "benar", "salah"
    ]

    for(var i=0;i<forbidden_delete.length;i++)
    (document.getElementById("remove_state_"+forbidden_delete[i])).hidden = true;
    
    $('#add_state').click(function(){

        toggleButton();
        
        //Kalau udah menginput aspeknya
        $("#input_state").keyup(function(e) {
            if(e.keyCode == 13 && $(this).val()!=="") {
                    e.preventDefault();
                    $("#add_element").click() 
            }
        });
    })

    $("#add_element").click(function(){
        var val = $("#input_state").val();
        
        //Generate Aspek
        if(!state_list.includes(val))
        $('#info_state').append(generateStateText(val));
        else alert("State sudah ada");
        //Mengembalikan button ke tempat semula
        toggleButton();
        $("#input_state").val("");
    })


});

function checkPointer(){
    if(pointer['state']>2){
        hs.openHidden("bobot_total_state");
        hs.openHidden("text_state");hs.openHidden("sub_state");
    }
    
    if(pointer['state']<=2){
        closeHidden("bobot_total_state");
        closeHidden("text_state");closeHidden("sub_state");
    }
}


//Coba pake jquery siapa tau bisa
function generateStateText(state){
    state_list.push(state);
    return `<div class="data_state" id="state_${state.toLowerCase()}">
         <p> ${state} </p>
         <div class="form-row data_state">
         <div class="form-group col-sm-2">
             <input type="number" class="state jumlah_state form-control input-sm"
             id= "jumlah_state_${state.toLowerCase().replace(" ", "_")}"  placeholder="Jumlah" min="1">
         </div>
         <div class="form-group col-sm-2">
             <input type="number" class="state bobot_state form-control input-sm"  
             id="bobot_state_${state.toLowerCase().replace(" ", "_")}" placeholder="Bobot" min="1">
         </div>
         <div class="form-group col-sm-2">
            <button type="button" id="remove_state_${state.toLowerCase().replace(" ", "_")}" 
            class="btn btn-secondary state" onclick = removeState("${state}")>
            Hapus state </button>
         </div>
       </div>
       </div>`
}


function changeButton(){
    button.className = button.className.replace(/col-sm-6/g, "col-sm-2");
    confirm.style.display="inline";
    button.innerHTML = "Batal Menambah State";
}


function returnToDefault(){
    button.className = button.className.replace(/col-sm-2/g, "col-sm-6");
    confirm.style.display="none";
    button.innerHTML = "Tambah State";
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


function removeState(state){
    $("#state_"+state.toLowerCase().replace(" ", "_")).remove();
    removeElement(state, state_list);
}





function getMultiplier(name){
    var x = document.getElementById("input_bobot_"+name);
    if(x.value==""){
        return 0;
    } else {
        return x.value;
    }
}

var gradeList = [
    {grade:"A", min : 80, max:100},
    {grade : "A-", min : 75, max: 80},
    {grade : "A/B", min : 70, max : 75},
    {grade : "B+", min : 65, max : 70},
    {grade : "B", min : 60, max : 65},
    {grade : "B-", min : 55, max : 60},
    {grade : "B/C", min:50, max:55},
    {grade:"C+", min:45, max:50},
    {grade:"C", min:40, max:45},
    {grade:"C/D", min:35, max:40},
    {grade:"C-", min:30, max:35},
    {grade:"D+", min:25, max :30},
    {grade:"D", min:20, max:25},
    {grade:"E", min:0, max:20}
];

function getGrade(num){
    if(Number(num)>=100) return "A";
    //Kalau tidak sama dengan 100
    else{
        for(var i=0;i<gradeList.length;i++){
            if(Number(num)>=Number(gradeList[i]["min"]) && Number(num)<Number(gradeList[i]["max"])){
                return gradeList[i].grade;
            }   
        }
    }
    return "T";
}


function count(){
    var nilai_akhir = 0;
    var jumlah_state = $(".jumlah_state");
    var bobot_state=$(".bobot_state");
    var soal = $('#input_jumlah_soal').val();
    var now = 0;
    var empty_pointer = -1;
    var true_pointer = -1;

    
//Kalau ada yang kosong    
if(state_list.includes("Kosong")){
    for(var i=0;i<state_list.length;i++){
        if((jumlah_state[i].value=="" || bobot_state[i].value=="") && state_list[i]!="Kosong"){
            unfilledAlert();
            return;
        }else{
            if(state_list[i]=="Kosong") empty_pointer=i;
            if(state_list[i]=="Benar") true_pointer=i;
            now += Number(jumlah_state[i].value);
            nilai_akhir+=Number(jumlah_state[i].value*bobot_state[i].value);
        }
    }
}else{
    for(var i=0;i<state_list.length;i++){
        if((jumlah_state[i].value=="" || bobot_state[i].value=="") && state_list[i]!="Salah"){
            unfilledAlert();
            return;
        }else{
            if(state_list[i]=="Salah") empty_pointer=i;
            if(state_list[i]=="Benar") true_pointer=i;
            now += Number(jumlah_state[i].value);
            nilai_akhir+=Number(jumlah_state[i].value*bobot_state[i].value);
        }
    }
}

if(now>soal) {errorAlert();return;}


//Mencari jumlah yang kosong
if(jumlah_state[empty_pointer].value ==""){
    jumlah_state[empty_pointer].value = Number(soal-now);
    if(bobot_state[empty_pointer].value=="")
    bobot_state[empty_pointer].value=0;
}

var nilai_akhir_ratusan = nilai_akhir/Number(soal*bobot_state[true_pointer].value)*100
    document.getElementById("ket_nilai").style.display="block";
    document.getElementById('nilai_utama').innerHTML=nilai_akhir;
    document.getElementById('elemen_state').innerHTML=nilai_akhir_ratusan.toFixed(2)

    console.log(nilai_akhir);

}

