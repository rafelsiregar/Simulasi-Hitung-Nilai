//Mengolah Alert
function errorAlert(){alert("Mohon maaf, ada kesalahan dalam input data");}
function unfilledAlert(){alert("Mohon maaf, data harus diisi");}

function openHidden(id){document.getElementById(id).hidden=false;}
function closeHidden(id){document.getElementById(id).hidden=true;}

var pointer = {tugas : 0, ulangan : 0};

var input = document.getElementById("input_aspek");
var aspect = document.getElementsByClassName("ket_aspek");
var button = document.getElementById("add_addit"); 
var confirm = document.getElementById("confirm");
var additional = [];



//Untuk menjalankan fungsi JQuery
$(document).ready(function(){
    
    $('#add_tugas').click(function(){
        pointer['tugas']++;
        $('#info_tugas').append(generateTaskText(pointer['tugas']));
        checkPointer();
    })

    $('#sub_tugas').click(function(){
        $('#tugas_ke_'+(pointer['tugas'])).remove();
        pointer['tugas']--;
        checkPointer();
    })    

    $("#add_ulangan").click(function(){
        pointer['ulangan']++;
        console.log(pointer['ulangan'])
        $('#info_ulangan').append(generateTestText(pointer['ulangan']));
        checkPointer();
    })

    $('#sub_ulangan').click(function(){
        $('#ulangan_ke_'+(pointer['ulangan'])).remove();
        pointer['ulangan']--;
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
        $('#info_bonus').append(generateAdditionalText(val));
        else alert("Aspek sudah ada");
        //Mengembalikan button ke tempat semula
        toggleButton();
        $("#input_aspek").val("");
    })

    $('#enable_bonus').click(function (){
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

function checkPointer(){
    if(pointer['tugas']+pointer['ulangan']>0){
        openHidden("bobot_total_tugas");openHidden("text_tugas");
    }

    if(pointer['tugas']+pointer['ulangan']<=0){
        closeHidden("bobot_total_tugas");
        closeHidden("text_tugas");
    }    

    if(pointer['tugas']>0){
        openHidden("sub_tugas");
    }
    
    if(pointer['tugas']<=0){
        closeHidden("sub_tugas");
    }

    if(pointer['ulangan']>0){
        openHidden("sub_ulangan");
    }
    
    if(pointer['ulangan']<=0){
        closeHidden("sub_ulangan");
    }
}



function generateTaskText(i){
    return `<div class="data_tugas" id="tugas_ke_${i}">
<div class="form-row">
    <div class="form-group col-3">
        <label for="nilai_tugas_${i}">Tugas ke-${i}</label>
        <input type="number" id="nilai_tugas_${i}" class="nilai_tugas form-control" value="" placeholder="Nilai Tugas" min="1" step="0.5">
    </div>
</div>
</div>`

}

function generateTestText(i){
    return `<div class="data_ulangan" id="ulangan_ke_${i}">
    <p>Ulangan ke-${i}</p>
    <div class="form-row">
        <div class="form-group col-sm-3">
            <input type="number" id="nilai_ulangan_${i}" 
            class="nilai_ulangan form-control" value="" placeholder="Nilai Soal" min="1" step="0.01">
        </div>
    </div>
</div>`
}

function generateAdditionalText(aspek){
    additional.push(aspek);
    return `<div class="data_addit" id="aspek_${aspek.toLowerCase().replace(" ", "_")}">
         <p> ${aspek} </p>
         <div class="form-row data_aspek">
         <div class="form-group col-sm-2">
             <input type="number" class="aspek nilai_aspek form-control input-sm"
             id= "nilai_aspek_${aspek.toLowerCase().replace(" ", "_")}"  placeholder="Nilai" min="1">
         </div>
         <div class="form-group col-sm-2">
             <input type="number" class="aspek bobot_aspek form-control input-sm"  
             id="bobot_aspek_${aspek.toLowerCase().replace(" ", "_")}" placeholder="Bobot" min="1">
         </div>
         <div class="form-group col-sm-2">
            <button type="button" id="remove_aspek_${aspek.toLowerCase().replace(" ", "_")}" 
            class="btn btn-secondary aspek" onclick = "removeAspect('${aspek}')">
            Hapus Aspek </button>
         </div>
       </div>
       </div>`
}

function removeAspect(aspek){
    document.getElementById("aspek_"+aspek.toLowerCase().replace(" ", "_")).remove();
    removeElement(aspek, additional);
}

function removeElement(element, array){
    var index = array.indexOf(element);
    if (index !== -1) {
    array.splice(index, 1);
    }
}


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

function getSum(className){
    var classElement = document.getElementsByClassName(className);
    if(classElement.length==0) return null;
    else {
        var sum = 0;
        for(var i=0;i<classElement.length;i++){
            sum += Number(classElement[i].value);
        }
        return sum;
    }
}

function count(){


    if(document.getElementById('input_bobot_tugas').value==""){
        document.getElementById('input_bobot_tugas').value=1;
    }

    if(document.getElementById('input_bobot_uts').value==""){
        document.getElementById('input_bobot_uts').value=1
    }

    if(document.getElementById('input_bobot_uas').value==""){
        document.getElementById('input_bobot_uas').value=1
    }

    var bobot = {
        tugas : document.getElementById('input_bobot_tugas').value,
        uts : document.getElementById('input_bobot_uts').value,
        uas : document.getElementById('input_bobot_uas').value
    }


    var nilai_harian = {
        tugas : {
            nilai : getSum('nilai_tugas'),
            jumlah : document.getElementsByClassName('nilai_tugas').length
        },
        ulangan : {
            nilai : getSum('nilai_ulangan'),
            jumlah : document.getElementsByClassName('nilai_ulangan').length
        },
        bobot : Number(bobot['tugas'])
    }
    console.log(typeof nilai_harian['bobot'])

    var uts = {
        nilai : Number(document.getElementById('input_nilai_uts').value),
        bobot: Number(bobot['uts'])
    } 

    console.log(typeof uts['bobot'])

    var uas = {
        nilai : Number(document.getElementById('input_nilai_uas').value),
        bobot : Number(bobot['uas'])
    } 

    console.log(typeof uas['bobot'])

    if(nilai_harian['tugas']['nilai']==null && nilai_harian['ulangan']['nilai']==null){
        alert("Harap menginput minimal satu elemen nilai harian");
        return;
    }else if(nilai_harian['tugas']['nilai']==null)nilai_harian['tugas']['nilai']=0;
    else if(nilai_harian['ulangan']['nilai']==null) nilai_harian['ulangan']['nilai']=0;

    
    //Menghitung nilai untuk elemen nilai harian
    var elemen_harian = (Number(nilai_harian['tugas']['nilai']+nilai_harian['ulangan']['nilai'])/
    (nilai_harian['tugas']['jumlah']+nilai_harian['ulangan']['jumlah']))
    
    console.log(nilai_harian)

    console.log(uts)

    console.log(uas)
    var nilai_akhir = (elemen_harian*nilai_harian['bobot']+
    Number(uts['nilai'])*uts['bobot']+Number(uas['nilai']*uas['bobot']))/Number(nilai_harian['bobot']+uts['bobot']+uas['bobot'])


    document.getElementById("nilai_utama").innerHTML = "<b>"+Math.round(nilai_akhir)+"</b>";
    var huruf = document.getElementsByClassName("huruf");
    huruf[0].innerHTML= getGrade(nilai_akhir/25);
    huruf[1].innerHTML=getGradeVersion2(nilai_akhir/25);
    huruf[2].innerHTML=getGradeVersion2((3*nilai_akhir+100)/100);
    var four = document.getElementsByClassName("angka");
    four[0].innerHTML=(nilai_akhir/25).toFixed(2);
    four[1].innerHTML=((3*nilai_akhir+100)/100).toFixed(2);
    document.getElementById("ket_nilai").style.display="block";
    open("original", nilai_akhir)
    open("harian", elemen_harian);
}

function open(id){
    openHidden("div_"+id);
}

function open(id, value){
    openHidden("div_"+id);
    document.getElementById("elemen_"+id).innerHTML=value;
}




function getGradeVersion2(num){
    var gradeList = [
    {grade:"A", min : 3.85, max:4},
    {grade : "A-", min : 3.51, max: 3.84},
    {grade : "B+", min : 3.18, max : 3.50},
    {grade : "B", min : 2.85, max : 3.17},
    {grade : "B-", min : 2.51, max : 2.84},
    {grade:"C+", min:2.18, max:2.50},
    {grade:"C", min:1.85, max:2.17},
    {grade : "C-", min:1.51, max:1.84},
    {grade:"D+", min:1.18, max :1.50},
    {grade:"D", min:1.00, max:1.17}
];
    num = num.toFixed(2);
    if(Number(num)<1) return "E";
    //Kalau tidak sama dengan 100 atau 0 
        for(var i=0;i<gradeList.length;i++){
            if(Number(num)>=Number(gradeList[i]["min"]) && Number(num)<=Number(gradeList[i]["max"])){
                return gradeList[i].grade;
            }   
        }
}

function getGrade(num){
    var gradeList = [
        {grade:"A", min : 3.66, max:4},
        {grade : "A-", min : 3.33, max: 3.66},
        {grade : "B+", min : 3.00, max : 3.33},
        {grade : "B", min : 2.66, max : 3.00},
        {grade : "B-", min : 2.33, max : 2.66},
        {grade:"C+", min:2.00, max:2.33},
        {grade:"C", min:1.66, max:2.00},
        {grade:"C-", min:1.33, max:1.66},
        {grade:"D+", min:1.00, max :1.33},
        {grade:"D", min:0.00, max:1.00}
    ]
    num = num.toFixed(2);
        if(Number(num)==0) return "E";
        else if(Number(num)==1) return "D";
        else{
            for(var i=0;i<gradeList.length;i++){
                console.log(gradeList[i].grade)
                if(Number(num)>Number(gradeList[i]["min"]) && Number(num)<=Number(gradeList[i]["max"])){
                    return gradeList[i].grade;
                }   
            }
        }
    
}

