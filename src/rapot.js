var pointer = construct_pointer({tugas : 0, ulangan : 0});

//Untuk menjalankan fungsi JQuery
$(document).ready(function(){
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




$('#img-bonus').click(function(){
    $('#pop-up').html(base_pop_up);
    var render = `<ol class="petunjuk">
      <li>Bonus tidak wajib diberikan oleh guru</li>
      <li>Apabila ada bonus, beri 'centang' pada "Berikan bonus"</li>
      <li>Tambahan merupakan nilai bonus karena siswa telah melakukan sesuatu</li>
      <li>Apabila siswa melakukan sesuatu yang 'negatif', kolom 'Tambahan' juga berisi nilai negatif</li>
      <li>Pengali merupakan seberapa banyak seorang siswa melakukan sesuatu tersebut</li>
      <li>Jika guru memberikan nilai tambahan secara keseluruhan, kosongkan kolom 'pengali'. kolom
        <br> tersebut akan secara otomatis bernilai '1'.</li>
    </ol>`


    $('#modal-pop-up').modal('show');
    $('#modal-title').text("Petunjuk penggunaan bonus");
    $('.modal-body').html(render);

})

$('#img-general').click(function(){
    $('#pop-up').html(base_pop_up);
    var render = `<ol class="petunjuk">
      <li>Bobot nilai merupakan bobot untuk setiap elemen dalam bentuk satuan</li>
    <li>Apabila bobot dalam bentuk persen, langsung tuliskan prosentase setiap elemen tanpa tanda persen (%).<br>
    Pastikan jumlah bobot semua elemen bernilai '100'. Jika tidak, maka akan terjadi kesalahan pada perhitungan nilai.</li>
    <li>Apabila guru tidak pernah memberikan nilai harian, guru dapat memasukkan nilai harian secara random, <br>
      akan tetapi tidak diperbolehkan memasukkan nilai kurang dari 78 atau KKM (jika KKM lebih tinggi dari 78) </li>
    <li>Pada poin 3, guru juga dapat memasukkan nilai keaktifan sebagai nilai harian.</li>
    </ol>`

    $('#modal-pop-up').modal('show');
    $('#modal-title').text("Petunjuk penggunaan aplikasi");
    $('.modal-body').html(render);

   
})




function generateTaskText(i){
    return `<div class="data_tugas" id="tugas_ke_${i}">
<div class="form-row">
    <div class="form-group col-3">
        <label for="nilai_tugas_${i}">Tugas ke-${i}</label>
        <input type="number" id="nilai_tugas_${i}" class="nilai nilai_tugas form-control" value="" placeholder="Nilai Tugas" min="1" step="0.5">
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
            class="nilai_ulangan form-control nilai" value="" placeholder="Nilai Ulangan" min="1" step="0.01">
        </div>
    </div>
</div>`
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

    var bonus = {
        tambahan : document.getElementsByClassName('nilai_aspek'),
        bobot : document.getElementsByClassName('bobot_aspek')
    }

    var bonus_score = 0;

    for(var i=0;i<bonus['tambahan'].length;i++){
        if(bonus['bobot'][i].value=="") bonus['bobot'][i].value=1;
        bonus_score += Number(bonus['tambahan'][i].value)*Number(bonus['bobot'][i].value);
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


    if(nilai_harian['tugas']['nilai']==null && nilai_harian['ulangan']['nilai']==null){
        renderAlert("Harap menginput minimal satu elemen nilai harian");
        return;
    }else if(nilai_harian['tugas']['nilai']==null)nilai_harian['tugas']['nilai']=0;
    else if(nilai_harian['ulangan']['nilai']==null) nilai_harian['ulangan']['nilai']=0;

    
    //Menghitung nilai untuk elemen nilai harian
    var elemen_harian = (Number(nilai_harian['tugas']['nilai']+nilai_harian['ulangan']['nilai'])/(nilai_harian['tugas']['jumlah']+nilai_harian['ulangan']['jumlah']))
    
    console.log(nilai_harian)

    console.log(uts)

    console.log(uas)
    var nilai_akhir = (elemen_harian*nilai_harian['bobot']+
    Number(uts['nilai'])*uts['bobot']+Number(uas['nilai']*uas['bobot']))/Number(nilai_harian['bobot']+uts['bobot']+uas['bobot']);

    nilai_akhir = nilai_akhir+bonus_score>100? 100:nilai_akhir+bonus_score;


    $("#nilai_utama").text(Math.round(nilai_akhir));
    document.getElementById("ket_nilai").style.display="block";
    open("huruf", getGrade(nilai_akhir))
    open("original", nilai_akhir);
    open("harian", elemen_harian);
}

function open(id){
    openHidden("div_"+id);
}

function open(id, value){
    openHidden("div_"+id);
    document.getElementById("elemen_"+id).innerHTML=value;
}


function getGrade(num){
    var gradeList = [
        {grade:"A", min : 86, max:100},
        {grade : "B", min : 80, max: 85},
        {grade : "C", min : 75, max : 79},
        {grade : "D", min : 60, max : 74},
        {grade : "E", min : 0, max : 59},
    ]
    num = Math.round(num);
    for(var i=0;i<gradeList.length;i++){
            console.log(gradeList[i].grade)
            if(Number(num)>=Number(gradeList[i]["min"]) && Number(num)<=Number(gradeList[i]["max"])){
                return gradeList[i].grade;
            }   
        }
}



/*function getGradeVersion2(num){
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
}*/





