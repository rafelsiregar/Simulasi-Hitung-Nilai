//Pointer untuk masing-masing elemen
var pointer=construct_pointer({tugas : 0, uts:0, uas:0, tambahan:0});

//Jalankan JQuery
$(document).ready(function(){
    $("#info_addit").append(generateAdditionalText("Kehadiran"),generateAdditionalText("Keaktifan"));

    $('#img-range').click(function(){
        $('#pop-up').html(base_pop_up);
        var render = `<ol class="petunjuk">
        <li>Jika tidak diisi, maka nilai A akan diatur pada 80 dan 
        untuk setiap rentang memiliki interval 5 <br>(sesuai standar Ilmu Komputer UGM)</li>
        <li>Anda dapat mengatur rentang nilai sebagai berikut :
          <ul class="petunjuk">
            <li>Range nilai A : berisi rentang untuk nilai A, A-, dan A/B<br>
            <b>(Contohnya nilai A- adalah pada rentang 75-80 dan A/B adalah pada rentang 70-75, maka ditulis \'5\')</b> </li>
            <li>Range nilai B : berisi rentang untuk nilai B+, B, B-, dan B/C</li>
            <li>Range nilai C : berisi rentang untuk nilai C+, C, C-, dan C/D</li>
            <li>Range nilai D : berisi rentang untuk nilai D+ dan D</li>
          </ul>
        </li>
      </ol>`
      
      $('#modal-pop-up').modal('show');
      $('#modal-title').text("Petunjuk Penggunaan Range Nilai");
      $('.modal-body').html(render);
    })

    $('#img-uts').click(function(){
        $('#pop-up').html(base_pop_up);
        var render = `<ol class="petunjuk">
        <li >Jika ada UTS, anda dapat mengeklik "Tambah soal" sebanyak jumlah soal dan memberikan nilai untuk setiap soal</li>
        <li>"Nilai maksimum" hanya diisi apabila total skor untuk soal tersebut tidak sama dengan 100, 
          <br>akan tetapi jika diisi '100' tidak akan menyebabkan error. </li>
        <li>Penghitungan UTS dengan format penilaian total dapat dilakukan dengan menggunakan menu <a href="tugas.html" class="a-tugas">Nilai Tugas</a>
        dan hasilnya di-copas ke kolom "Nilai Soal" pada "Nomor 1" UTS dengan "Bobot Soal" sesuai Bobot UTS dan <br>
        "Nilai Maksimum" boleh dikosongkan. </li>
          </ol>`

        $('#modal-pop-up').modal('show');
        $('#modal-title').text("Petunjuk perhitungan nilai UTS");
        $('.modal-body').html(render);
    })

    $('#img-uas').click(function(){
        $('#pop-up').html(base_pop_up);
        var render = `
        <ol class="petunjuk">
          <li>Jika ada UAS, anda dapat mengeklik "Tambah soal" sebanyak jumlah soal dan memberikan nilai untuk setiap soal</li>
          <li>"Nilai maksimum" hanya diisi apabila total skor untuk soal tersebut tidak sama dengan 100, 
            <br>akan tetapi jika diisi '100' tidak akan menyebabkan error. </li>
          <li>Penghitungan UAS dengan format penilaian total dapat dilakukan dengan menggunakan menu <a href="tugas.html" class="a-tugas">Nilai Tugas</a><br>
            dan hasilnya di-copas ke kolom "Nilai Soal" pada "Nomor 1" UAS dengan "Bobot Soal" sesuai Bobot UAS dan <br>
            "Nilai Maksimum" boleh dikosongkan. </li>
        </ol>`

        $('#modal-pop-up').modal('show');
        $('#modal-title').text("Petunjuk perhitungan nilai UAS");
        $('.modal-body').html(render);
    })


    

    


    

    //Disable khusus kehadiran dan keaktifan
    var aspek = document.getElementsByClassName("aspek");
    for(var i=0;i<aspek.length;i++){
        aspek[i].disabled = true;
        aspek[i].value="";
    }

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

    

});

function checkPointer(){
    if(pointer['tugas']>0){
        openHidden("bobot_total_tugas");
        openHidden("sub_tugas");
    }
    
    if(pointer['tugas']<=0){
        closeHidden("bobot_total_tugas");
        closeHidden("sub_tugas");
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
    return `<div class="data_tugas" id="tugas_ke_${i}">
<div class="form-row">
    <div class="form-group col-3">
    <label for="nilai_tugas_${i}">Nilai Tugas : </label>
        <input type="number" id="nilai_tugas_${i}" class="nilai_tugas form-control input-sm nilai-small" value=""
        placeholder="Nilai" min="1" step="0.5">
    </div>
    <div class="form-group col-3">
        <label for="bobot_tugas_${i}">Bobot Tugas : </label>
        <input type="number" id="bobot_tugas_${i}" class="bobot_tugas form-control input-sm nilai-small" value=""
        placeholder="Bobot" min="1" step="0.5">
    </div>
    <div class="form-check-inline col-3 mt-1">
        <label for="wajib_tugas_${i}" class="form-check-label">
            <input type="checkbox" id="wajib_tugas_${i}" class="wajib_tugas form-check-input" style="margin-top:20px;" checked>Wajib</label>
        </div>
</div>
</div>`
}


function generateMidText(i){
    return `<div class="data_uts" id="uts_nomor_${i}">
    <p>Nomor ${i}</p>
    <div class="form-row">
        <div class="form-group col-sm-6">
            <input type="number" id="nilai_uts_${i}" class="nilai-std nilai_uts form-control" placeholder="Nilai Soal" min="1" step="0.01" value="">
        </div>
        <div class="form-group col-sm-6">
            <input type="number" id="bobot_uts_${i}" class="nilai-std bobot_uts form-control" value="" placeholder="Bobot Soal" min="1" step="0.1">
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-sm-6">
            <label for="max_uts_${i}"> Nilai Maksimum : </label>
            <input type="number" id="max_uts_${i}" class="nilai-std maks_uts form-control"  min="1" step="0.5">
        </div>
    </div>
</div>`
}

function generateFinalText(i){
    return  `<div class="data_uas" id="uas_nomor_${i}">
    <p>Nomor ${i}</p>
    <div class="form-row">
        <div class="form-group col-sm-6">
            <input type="number" id="nilai_uas_${i}" class="nilai-std nilai_uas form-control" placeholder="Nilai Soal" value="" min="1" step="0.01">
        </div>
        <div class="form-group col-sm-6">
            <input type="number" id="bobot_uas_${i}" class="nilai-std bobot_uas form-control" value="" placeholder="Bobot Soal" min="1" step="0.1">
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-sm-6">
            <label for="max_uas_${i}"> Nilai Maksimum : </label>
            <input type="number" id="max_uas_${i}" class="nilai-std maks_uas form-control" min="1" step="0.5">
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

function getGradeList(std, r1, r2, r3, r4) {
    return [
        {grade:"A", min : std, max:100},
        {grade : "A-", min : std-r1, max: std},
        {grade : "A/B", min : std-2*r1, max : std-r1},
        {grade : "B+", min : std-2*r1-r2, max : std-2*r1},
        {grade : "B", min : std-2*r1-2*r2, max : std-2*r1-r2},
        {grade : "B-", min : std-2*r1-3*r2, max : std-2*r1-2*r2},
        {grade : "B/C", min:std-2*r1-4*r2, max:std-2*r1-3*r2},
        {grade:"C+", min:std-2*r1-4*r2-r3, max:std-2*r1-4*r2},
        {grade:"C", min:std-2*r1-4*r2-2*r3, max:std-2*r1-4*r2-r3},
        {grade:"C-", min:std-2*r1-4*r2-3*r3, max:std-2*r1-4*r2-2*r3},
        {grade:"C/D", min:std-2*r1-4*r2-4*r3, max:std-2*r1-4*r2-3*r3},
        {grade:"D+", min:std-2*r1-4*r2-4*r3-r4, max :std-2*r1-4*r2-4*r3},
        {grade:"D", min:std-2*r1-4*r2-4*r3-2*r4, max:std-2*r1-4*r2-4*r3-r4},
        {grade:"E", min:0, max:std-2*r1-4*r2-4*r3-2*r4}
    ];
} 


function getGrade(num, thres, r1, r2, r3, r4){
    gradeList = getGradeList(thres, Number(r1), Number(r2), Number(r3), Number(r4));
    console.log(gradeList);
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
    var bobot = {tugas : 0, 
                uts : 0, 
                uas : 0, 
                tambahan : 0};

    var hiddenStatus={tugas : tugas['nilai'].length==0,
                    uts : uts['nilai'].length==0,
                    uas : uas['nilai'].length==0,
                    tambahan : ((tambahan['check']==false)||tambahan['nilai'].length==0)
                    };



    if(hiddenStatus['tugas'] && hiddenStatus['uts'] && hiddenStatus['uas'] && hiddenStatus['tambahan']){
        
        renderAlert("Harap menginput minimal salah satu elemen nilai");
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
                //console.log(i+" "+hiddenStatus[i]+" "+bobot[i])
                if(i!="tambahan" && hiddenStatus[i]==false && bobot[i]==0){
                    //console.log('Error disini')
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
                        //console.log('Error lagi')
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
            var moreEnabled = document.getElementById('enable_more').checked;
            //console.log(moreEnabled)
            //Kalau tidak diperbolehkan lebih dari 100, konversi ke 100
            if(!moreEnabled)
            nilai_akhir = (nilai_akhir/bobot_total)*100;
            //Kalau diperbolehkan
            else{
                nilai_akhir = nilai_akhir > 100 ? 100 : nilai_akhir;
            }
        }

        nilai_akhir = nilai_akhir+tambahan['tambahan']>100? 100 : nilai_akhir+tambahan['tambahan'];

        var amin;

        if(document.getElementById('a-minimum').value==""){
            amin = 80;
        }else{
            amin = Number(document.getElementById('a-minimum').value);
        }

        var ranges = document.getElementsByClassName('range');
        var rangeList = [];
        for(var i=0;i<ranges.length;i++){
            if(ranges[i].value=="") rangeList.push(5);
            else rangeList.push(ranges[i].value);
        }
        

        document.getElementById("nilai_utama").innerHTML = "<b>"+nilai_akhir.toFixed(2)+"</b>";
        document.getElementById("nilai_huruf").innerHTML = "<b>("+getGrade(nilai_akhir, amin, rangeList[0], rangeList[1], rangeList[2], rangeList[3])+")</b>";
        document.getElementById("ket_nilai").style.display="block";
        open("tugas", nilai["tugas"], bobot["tugas"]);open("uts", nilai["uts"],bobot["uts"]);
        open("uas", nilai["uas"], bobot["uas"]);
        console.log(nilai, bobot, tambahan);
        openAddition(nilai['tambahan'], bobot['tambahan'], tambahan['tambahan']);
        

    }

    function openAddition(nilai, bobot, tambahan){
        if(document.getElementById("enable_addition").checked){
            
            openHidden('div_tambahan')
            console.log(bobot);
            
            console.log(nilai+" "+bobot);
            var nilai_olah=0;


            //Kalau ada bobotnya
            if(bobot!=0) nilai_olah = (nilai/bobot)*100+tambahan;
            //Kalau tidak ada bobotnya
            else nilai_olah=tambahan;

            nilai_olah=Math.min(100, nilai_olah);

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





