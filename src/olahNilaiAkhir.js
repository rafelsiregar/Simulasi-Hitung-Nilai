//Mengolah Alert
function errorAlert(){alert("Mohon maaf, ada kesalahan dalam input data");}
function unfilledAlert(){alert("Mohon maaf, data harus diisi");}

function openHidden(id) {document.getElementById(id).hidden=false};
function closeHidden(id){document.getElementById(id).hidden=true};

var input = document.getElementById("input_aspek");
var aspect = document.getElementsByClassName("ket_aspek");
var button = document.getElementById("add_addit"); 
var confirm = document.getElementById("confirm");

var pointer={tugas : 0, uts:0, uas:0, tambahan:0};
var additional = [];


//Jalankan JQuery
$(document).ready(function(){
    $("#info_addit").append(generateAdditionalText("Kehadiran"),generateAdditionalText("Keaktifan"));
    
    var aspek = document.getElementsByClassName("aspek");
    for(var i=0;i<aspek.length;i++){
        aspek[i].disabled = true;
        aspek[i].value="";
    }
    
    $('#add_tugas').click(function(){
        pointer['tugas']++;
        console.log(pointer['tugas'])
        $('#info_tugas').append(generateTaskText(pointer['tugas']));
        checkPointer();
    });

    $('#sub_tugas').click(function(){
    $('#info_tugas_'+(pointer['tugas'])).remove();
        pointer['tugas']--;
        checkPointer();
    });    

    $("#add_uts").click(function(){
        pointer['uts']++;
        console.log(pointer['uts'])
        $('#info_uts').append(generateMidText(pointer['uts']));
        checkPointer();
    });

    $('#sub_uts').click(function(){
        $('#uts_nomor_'+(pointer['uts'])).remove();
        pointer['uts']--;
        checkPointer();
    });    

    $("#add_uas").click(function(){
        pointer['uas']++;
        console.log(pointer['uas'])
        $('#info_uas').append(generateFinalText(pointer['uas']));
        checkPointer();
    });

    $('#sub_uas').click(function(){
        $('#uas_nomor_'+(pointer['uas'])).remove();
        pointer['uas']--;
        checkPointer();
    });    

    $('#add_addit').click(function(){

        toggleButton();
        
        //Kalau udah menginput aspeknya
        $("#input_aspek").keyup(function(e) {
            if(e.keyCode == 13 && $(this).val()!=="") {
                    e.preventDefault();
                    $("#add_element").click() 
            }
        });
    });

    $("#add_element").click(function(){
        var val = $("#input_aspek").val();
        
        //Generate Aspek
        if(!additional.includes(val))
        $('#info_addit').append(generateAdditionalText(val));
        else alert("Aspek sudah ada");
        console.log(generateAdditionalText(val));
        //Mengembalikan button ke tempat semula
        toggleButton();
        $("#input_aspek").val("");
    });

    $('#enable_addition').click(function(){
        var id = $(this).attr('id')
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
    if(pointer['tugas']>0){
        openHidden("bobot_total_tugas");
        openHidden("text_tugas");openHidden("sub_tugas");
    }
    
    if(pointer['tugas']<=0){
        closeHidden("bobot_total_tugas");
        closeHidden("text_tugas");closeHidden("sub_tugas");
    }

    if(pointer['uts']>0){
        openHidden("bobot_total_uts");
        openHidden("sub_uts");
    }
    
    if(pointer['uts']<=0){
        closeHidden("bobot_total_uts");
        closeHidden("sub_uts");
    }   

    if(pointer['uas']>0){
        openHidden("bobot_total_uas");
        openHidden("sub_uas");
    }
    
    if(pointer['uas']<=0){
        closeHidden("bobot_total_uas");
        closeHidden("sub_uas");
    }
}


//Coba pake jquery siapa tau bisa
function generateTaskText(i){
    return `<div class="data_tugas" id="info_tugas_${i}">
<div class="form-row">
    <div class="form-group col-2">
    <label for="nilai_tugas_${i}">Nilai Tugas : </label>
        <input type="number" id="nilai_tugas_${i}" class="nilai_tugas form-control input-sm" value=""
        placeholder="Nilai" min="1" step="0.5">
    </div>
    <div class="form-group col-2">
        <label for="bobot_tugas_${i}">Bobot Tugas : </label>
        <input type="number" id="bobot_tugas_${i}" class="bobot_tugas form-control input-sm" value=""
        placeholder="Bobot" min="1" step="0.5">
    </div>
    <div class="form-check-inline col-2 mt-1">
        <label for="wajib_tugas_${i}" class="form-check-label">
            <input type="checkbox" id="wajib_tugas_${i}" class="wajib_tugas form-check-input" checked>Wajib</label>
        </div>
</div>
</div>`
}


function generateMidText(i){
    return `<div class="data_uts" id="uts_nomor_${i}">
    <p>Nomor ${i}</p>
    <div class="form-row">
        <div class="form-group col-sm-3">
            <input type="number" id="nilai_uts_${i}" 
            class="nilai_uts form-control" placeholder="Nilai Soal" min="1" step="0.01" value="">
        </div>
        <div class="form-group col-sm-3">
            <input type="number" id="bobot_uts_${i}" class="bobot_uts form-control" value=""
            placeholder="Bobot Soal" min="1" step="0.1">
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-sm-4">
                <label for="max_uts_${i}"> Nilai Maksimum (abaikan jika sama dengan 100) : </label>
            <input type="number" id="max_uts_${i}" class="maks_uts form-control"  min="1" step="0.5">
        </div>
    </div>
</div>`
}

function generateFinalText(i){
    return  `<div class="data_uas" id="uas_nomor_${i}">
    <p>Nomor ${i}</p>
    <div class="form-row">
        <div class="form-group col-sm-3">
            <input type="number" id="nilai_uas_${i}" class="nilai_uas form-control" placeholder="Nilai Soal" value="" min="1" step=
            "0.01">
        </div>
        <div class="form-group col-sm-3">
            <input type="number" id="bobot_uas_${i}" class="bobot_uas form-control" value="" placeholder="Bobot Soal" min="1" step="0.1">
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-sm-4">
            <label for="max_uas_${i}"> Nilai Maksimum (abaikan jika sama dengan 100) : </label>
            <input type="number" id="max_uas_${i}" class="maks_uas form-control" min="1" step="0.5">
        </div>
    </div>
</div>`
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


function countScore(){

    var nilai_akhir = 0;

    //Elemen yang digunakan dalam menghitung nilai
    var tugas = {
        nilai : document.getElementsByClassName("nilai_tugas"),
        bobot : document.getElementsByClassName("bobot_tugas"),
        multiplier : getMultiplier("tugas"),
        wajib : document.getElementsByClassName("wajib_tugas")
    };
    var uts = {
        nilai : document.getElementsByClassName("nilai_uts"),
        bobot : document.getElementsByClassName("bobot_uts"),
        multiplier : getMultiplier("uts"),
        max : document.getElementsByClassName("maks_uts")
    };

    var uas = {
        nilai : document.getElementsByClassName("nilai_uas"),
        bobot : document.getElementsByClassName("bobot_uas"),
        multiplier : getMultiplier("uas"),
        max : document.getElementsByClassName("maks_uas")
        
    };

    var tambahan = {
        nilai : document.getElementsByClassName("nilai_aspek"),
        bobot : document.getElementsByClassName("bobot_aspek"),
        tambahan : 0,
        check : document.getElementById("enable_addition").checked
    };

    var bobot_total = 0;
    
    //Mengolah elemen nilai
    var nilai = {tugas : 0, uts : 0, uas : 0, tambahan : 0};

    //Menghitung jumlah bobot
    var bobot = {tugas : 0, uts : 0, uas : 0, tambahan : 0};
    var hiddenStatus={tugas : tugas['nilai'].length==0,
    uts : uts['nilai'].length==0,
    uas : uas['nilai'].length==0,
    tambahan : ((tambahan['check'].checked==false)||tambahan['nilai'].length==0)};

    console.log(hiddenStatus['tugas'] +" "+ hiddenStatus['uts'] +" "+ hiddenStatus['uas'] +" "+ hiddenStatus['tambahan'])

    if(hiddenStatus['tugas'] && hiddenStatus['uts'] && hiddenStatus['uas'] && hiddenStatus['tambahan']){
        alert("Harap menginput minimal salah satu elemen nilai");
        return;
    }
    
        

    if(tambahan['check']){
        if(tambahan['nilai'].length==0){
            errorAlert();return;
        }
        for(var i=0;i<tambahan['nilai'].length;i++){
            //Menambahkan nilai tambah untuk nilai akhir
            if(tambahan["bobot"][i].value==""){
                if(tambahan["nilai"][i].value!="")
                    tambahan['tambahan']+=Number(tambahan["nilai"][i].value);
            //Kalau ada prosentase untuk bobot tambahan
            }else{
                nilai["tambahan"] = nilai["tambahan"]+Number(tambahan.nilai[i].value*(tambahan.bobot[i].value/100));
            }
            
            bobot["tambahan"]=bobot["tambahan"]+Number(tambahan['bobot'][i].value);
            bobot_total = bobot_total+Number(tambahan['bobot'][i].value);
        }
    }


    for(var i=0;i<tugas.nilai.length;i++){
        //Menghitung jumlah bobot untuk tugas

        //Kalau tugasnya wajib
        if(tugas['wajib'][i].checked){
            bobot['tugas']=bobot['tugas']+Number(tugas['bobot'][i].value);

            //Menghitung nilai tugas
            if(tugas["bobot"][i].value==""){
                unfilledAlert();
                return;
            }

            //Kalau nilainya kosong
            if(tugas['nilai'][i].value==""){
                tugas['nilai'][i]=0;
            }

            nilai["tugas"] = nilai["tugas"]+Number(tugas["nilai"][i].value*(tugas["bobot"][i].value/100));
            
        //Kalau tugasnya gak wajib
        }else{
            
            if(tugas['nilai'][i].value!=""){
                if(tugas['bobot'][i].value==""){
                    tambahan['tambahan']+=Number(tugas['nilai'][i].value);
                }
                else{
                    tambahan['tambahan']+=Number(tugas['nilai'][i].value)*Number(tugas['bobot'][i].value)/100;
                }
            }    
        }
        //Mengecek validitas skor
        if(Number(tugas["nilai"][i].value)>Number(100)) {
            errorAlert();
            return;
        }
        }


        //Menghitung jumlah bobot total
        bobot_total = bobot_total+Number(tugas.multiplier);

    //Menghitung nilai tugas apabila ada multiplier
    if(tugas["multiplier"]!=0) nilai["tugas"] = (tugas["multiplier"]/100)*nilai["tugas"];

    for(var i=0;i<uts["nilai"].length;i++){

        //Kalau ada UTS
        if(uts["max"]!=null){

            console.log("Debug : "+uts['nilai'][i].value!="" && uts["max"][i].value!="" && uts["bobot"][i].value=="")
            //Kalau soal yang gak wajib dikerjakan, masukin ke nilai tapi gak usah pake bobot
            if(uts["nilai"][i].value!="" && uts["bobot"][i].value==""){
                if(uts['max'][i].value=="")
                uts['bobot'][i].value="";
                else
                //Kalau ada nilai maksimalnya tapi gak ada bobotnya (cuman diisi)
                uts["bobot"][i].value=100;
            }

            
            //Menghitung jumlah bobot untuk UTS
            if(uts['bobot'][i]!=="")
            bobot['uts']=bobot['uts']+Number(uts['bobot'][i].value);

            var nilai_jadi=0;
            //Menghitung nilai yang akan dimasukkan apabila total skor bukan 100
            if(uts['max'][i].value!=="")
            nilai_jadi = Number((uts["nilai"][i].value/uts["max"][i].value)*100);
            //Kalau nilai maksimalnya dikosongan, berarti dianggap 100
            else{
                nilai_jadi = Number((uts['nilai'][i].value));
                if(uts['bobot'][i].value!==""){
                    uts['max'][i].value=100;
                }
            }
            

            //Mengecek validitas skor
            if(nilai_jadi>100) {
                errorAlert();
                return;
            }
            
            //Menghitung nilai 1 nomor UTS

            //Kalau wajib
            if(uts['bobot'][i].value!=0)
            nilai["uts"] = nilai["uts"]+Number(nilai_jadi*(uts.bobot[i].value/100));
            //Kalau bonus
            else
            nilai["uts"] = nilai["uts"]+Number(nilai_jadi);
        }
    }

    //Menghitung jumlah bobot total
    bobot_total=bobot_total+Number(uts.multiplier);

    //Menghitung nilai UTS jika ada multiplier
    if(uts["multiplier"]!=0) nilai["uts"] = (uts["multiplier"]/100)*nilai["uts"];

    for(var i=0;i<uas["nilai"].length;i++){
        //Kalau ada UAS
        if(uas["max"]!=null){
            //Kalau soal yang gak wajib dikerjakan, masukin ke nilai tapi gak usah pake bobot
            if(uas["nilai"][i].value!="" && uas["bobot"][i].value==""){
                uas['bobot'][i].value="";
            //Kalau ada nilai maksimalnya tapi gak ada bobotnya (cuman diisi)
            }else if((uas["bobot"][i].value=="" && uas["max"][i].value!="") && uas['nilai'][i].value!=""){
                uas["bobot"][i].value=100;
            }
            
            //Menghitung jumlah bobot untuk UAS
            if(uas['bobot'][i]!=="")
            bobot['uas']=bobot['uas']+Number(uas['bobot'][i].value);

            var nilai_jadi=0;
            //Menghitung nilai yang akan dimasukkan apabila total skor bukan 100
            if(uas['max'][i].value!=="")
            nilai_jadi = Number((uas["nilai"][i].value/uas["max"][i].value)*100);
            //Kalau nilai maksimalnya dikosongan, berarti dianggap 100
            else{
                nilai_jadi = Number((uas['nilai'][i].value));
                if(uas['bobot'][i].value!==""){
                    uas['max'][i].value=100;
                }
            }
            

            //Mengecek validitas skor
            if(nilai_jadi>100) {
                errorAlert();
                return;
            }
            
            //Menghitung nilai 1 nomor UTS

            //Kalau wajib
            if(uas['bobot'][i].value!=0)
            nilai["uas"] = nilai["uas"]+Number(nilai_jadi*(uas.bobot[i].value/100));
            //Kalau bonus
            else
            nilai["uas"] = nilai["uas"]+Number(nilai_jadi);
        }

    }
        //Menghitung jumlah bobot total
        bobot_total=bobot_total+Number(uas.multiplier);

    
    //Menghitung nilai UAS jika ada multiplier
    if(uas["multiplier"]!=0) nilai["uas"] = (uas["multiplier"]/100)*nilai["uas"];



        //Kalau jumlah bobot total kosong
        if(bobot_total==0){
            for(var i in bobot){
                bobot_total += bobot[i];
            }
            //Untuk cek datanya kosong apa nggak
            for(var i in nilai){
                //Kalau bobotnya ada yang 0
                console.log(i+" "+hiddenStatus[i]+" "+bobot[i])
                if(i!="tambahan" && hiddenStatus[i]==false && bobot[i]==0){
                    console.log('Error disini')
                    unfilledAlert();
                    return;
                }
            }
        }
        //Kalau tidak kosong
        else{
            //Supaya bobotnya pas 100 semua
            for(var i in nilai){
                //Buat jumlah nilai menjadi 100 (kecuali tambahan)
                if(i!="tambahan" && bobot[i]!=100 && bobot[i]!=0){
                    //Kalau ada salah satu yang nol
                    if(getMultiplier(i)==0){
                        console.log('Error lagi')
                        unfilledAlert();
                        return;
                    }
                    var nilai_awal = (nilai[i]/getMultiplier(i))*100;
                    console.log("Olah : ")
                    console.log(nilai_awal+" "+bobot[i])
                    nilai[i]=Number(nilai_awal/bobot[i])*(getMultiplier(i));
                    bobot[i]=100;
                }
            }
        }

        nilai_akhir = Number(nilai["tugas"]+nilai["uts"]+nilai["uas"]+nilai["tambahan"]);

        
        //Kalau jumlah bobotnya belum 100
        if(bobot_total<100 && bobot_total!=0){
            var bobot_tambahan=(100-bobot_total);
            nilai_akhir += bobot_tambahan;
        }else if(bobot_total>100){
            //Konversi ke 100
            nilai_akhir = (nilai_akhir/bobot_total)*100;
        }

        console.log(nilai_akhir);
        nilai_akhir = nilai_akhir+tambahan['tambahan']>100? 100 : nilai_akhir+tambahan['tambahan'];

        console.log("Nilai :")

        console.log(nilai);
        console.log("Bobot : ")
        console.log(bobot);

        console.log("Nilai akhir : ")
        
        console.log(nilai_akhir);
        
        document.getElementById("nilai_utama").innerHTML = "<b>"+nilai_akhir.toFixed(2)+"</b>";
        document.getElementById("nilai_huruf").innerHTML = "<b>("+getGrade(nilai_akhir)+")</b>";
        document.getElementById("ket_nilai").style.display="block";
        open("tugas", nilai["tugas"], bobot["tugas"]);open("uts", nilai["uts"],bobot["uts"]);
        open("uas", nilai["uas"], bobot["uas"]);
        openAddition(nilai['tambahan'], bobot['tambahan'], tambahan['tambahan']);
        

    }

    function openAddition(nilai, bobot, tambahan){
        if(document.getElementById("enable_addition").checked){
            
            openHidden('div_tambahan')
            console.log(bobot);
            
            console.log(nilai+" "+bobot);
            var nilai_olah=0;

            if(bobot!=0) nilai_olah = (nilai/bobot)*100+tambahan;
            else nilai_olah=tambahan;

            if(nilai_olah>100) nilai_olah=100;
            else if(nilai_olah<0) nilai_olah = 0;


            document.getElementById("elemen_tambahan").innerHTML=nilai_olah.toFixed(2);
            document.getElementById("bobot_elemen_tambahan").innerHTML=(nilai+tambahan).toFixed(2)+")";
        }else{
            closeHidden('div_tambahan')
            document.getElementById('elemen_tambahan').innerHTML="";
        }
    }

    function open(id, nilai, bobot){
        if(!document.getElementById("bobot_total_"+id).hidden){
            openHidden("div_"+id);
            if(getMultiplier(id)!=0){
                var temp=Number(nilai/getMultiplier(id)*100);
                document.getElementById("elemen_"+id).innerHTML = temp.toFixed(2);
                document.getElementById("bobot_elemen_"+id).innerHTML = nilai.toFixed(2)+")";
            }else{
                var temp=Number(nilai/bobot*100)
                document.getElementById("elemen_"+id).innerHTML = temp.toFixed(2);
                document.getElementById("bobot_elemen_"+id).innerHTML = nilai.toFixed(2)+")";
            }        
        }
    }


