  
  //Mengolah Alert
  function errorAlert(){
    alert("Mohon maaf, ada kesalahan dalam input data");
  }

  function unfilledAlert(){
    alert("Mohon maaf, data harus diisi");
  }

  
  function openHidden(tag_name){
    var x = document.getElementById(tag_name);
    x.style.display="block";
  }



  function write_form(id){
    var form = "jumlah_soal_"+id;
    $("#"+form).slideToggle();
    check();
  }



  //Mengolah Autoinput
  function autoInput(nama){
    if(nama=="isian"){
      document.getElementById("skor_"+nama).value=(2*Number(document.getElementById("soal_"+nama).value));
    }
    else{document.getElementById("skor_"+nama).value=document.getElementById("soal_"+nama).value;}  
  }

  //Mengolah toggle
  function check(){
    var x = document.getElementsByClassName("jenis_soal");
    var y = document.getElementById("average_helper");
    var btn = document.getElementById("count");
    var checked=false;

    for(var i=0;i<x.length;i++){
      if(x[i].checked==true){checked=true;break;}
    }
    if(checked){
      y.style.display="block";
      btn.hidden=false;
    }else{
      y.style.display="none";
      btn.hidden=true;
    }
  }

  function getInfo(nama){
    document.getElementById("ket_"+nama).innerHTML = getScoreInfo(nama)['benar']+"/"+getScoreInfo(nama)['total'];
    document.getElementById("keterangan_"+nama).hidden=false;
  }

  function closeInfo(nama){
    document.getElementById("ket_"+nama).innerHTML = "";
    document.getElementById("keterangan_"+nama).hidden=true;
  }

  function check_hidden(nama){
    return document.getElementById("jumlah_soal_"+nama).style.display=="none";
  }


  //Fungsi untuk mengolah nilai soal obyektif (pilgan, isian, mencocokkan, dsb)
  function getFixedInfo(nama){
    document.getElementById("ket_"+nama).innerHTML = getFixedScoreInfo(nama)['benar'] +"/"+getFixedScoreInfo(nama)['total'];
    document.getElementById("keterangan_"+nama).hidden=false;
  }



  function getFixedScoreInfo(nama){
    /*Benar adalah variabel untuk menyimpan jumlah betul, 
    nilai adalah variabel untuk menyimpan skor*/
    if(check_hidden(nama)) return 0;
    var keterangan = {
        soal : document.getElementById("soal_"+nama).value,
        benar : document.getElementById("benar_"+nama).value,
        maksimum : document.getElementById("skor_"+nama).value
    }
    
    for(var ket in keterangan){
      if(ket=="") {unfilledAlert();return false;}
    }

    //Numberify the variable
    keterangan['soal']=Number(keterangan['soal'])
    keterangan['benar']=Number(keterangan['benar'])
    keterangan['maksimum']=Number(keterangan['maksimum'])



    if(keterangan['benar']>keterangan['soal'] || keterangan['soal']==0 || keterangan['maksimum']==0){
      errorAlert();return false;
    }

    var skor_per_soal =keterangan['maksimum']/keterangan['soal'];
    var nilai_benar = skor_per_soal*keterangan['benar'];
    return {benar : nilai_benar, total : keterangan['maksimum']}
  }


  
  //Fungsi untuk mengolah nilai soal subyektif (uraian, bacaan)

  //Mengolah nilai
  function getScoreInfo(nama){
    if(check_hidden(nama)) return 0;
    if(AllUnfilled(nama)) {unfilledAlert();return false;}
    var keterangan = {
      helper : document.getElementsByClassName("helper_"+nama),
      benar : document.getElementsByClassName("benar_"+nama),
      skor : document.getElementsByClassName("skor_"+nama)
    };
    var benar = 0, skor=0;
    //Memasukkan total skor untuk uraian dan bacaan
    for(var i=0;i<keterangan['benar'].length;i++){
      //Kalau tidak pakai helper pecahan
      if(keterangan['helper'][i].style.display=="none"){
        //Kalau ada isinya semua
        if(keterangan['benar'][i].value!="" && keterangan['skor'][i].value!=""){
          if(Number(keterangan['benar'][i]).value>Number(keterangan['skor'][i].value)){
            errorAlert();return false;
          }else{
            benar = benar + Number(keterangan['benar'][i].value);
          }
        //Kalau salah satu ada isinya
        }else if(keterangan['benar'][i].value=="" ^ keterangan['skor'][i].value==""){
          unfilledAlert();return false;
        }
      //Kalau pakai helper pecahan
      }else{
        var pecahan = {
          pembilang : document.getElementsByClassName("pembilang_"+nama),
          penyebut : document.getElementsByClassName("penyebut_"+nama)
        }
          //Kalau pecahannya dipakai
          if(pecahan["pembilang"][i].value!="" && pecahan["penyebut"][i].value!=""){


            //Kalau tidak valid
            if(pecahan["pembilang"][i].value>=pecahan["penyebut"][i].value){
              errorAlert();
              break;
            }


            //Kalau nilai utama ada isinya
            else if(keterangan['benar'][i].value!="" && keterangan['skor'][i].value!=""){
              //Kalau nggak valid
              if(Number(keterangan['benar'][i]).value>Number(keterangan['skor'][i].value)){
                errorAlert();return false;

              //Kalau valid
              }else{
                benar = benar+Number(keterangan['benar'][i].value)+
              Number(pecahan["pembilang"][i].value/pecahan["penyebut"][i].value);
              } 


            //Kalau salah satu gak diisi
            }else if(keterangan['benar'][i].value=="" ^ keterangan['skor'][i].value==""){
              unfilledAlert();return false;
            }


          //Kalau pakai helper pecahan tapi gak diisi
          }else{
            unfilledAlert();return false;
          }
      }   
    }

    //Memasukkan total skor untuk uraian dan bacaan
    for(var i=0;i<keterangan['skor'].length;i++){
      skor = skor + Number(keterangan['skor'][i].value);
    }
    //Mengeluarkan total skor
    return {benar : benar, total:skor};
  }


  function AllTrue(objArray){
      for(var i=0;i<objArray.length;i++){
        //Kalau ada yang tidak berupa angka
        if(objArray[i]['info']===false)
          return false;
      }
      //Kalau semuanya berupa angka
      return true;
  }


  function AllUnfilled(nama){
    var sectionInfo = {
      score : document.getElementsByClassName("benar_"+nama),
      max : document.getElementsByClassName("skor_"+nama),
      hidden : check_hidden(nama)
    };

    if(sectionInfo.hidden==true) return true;
      for(var i=0;i<sectionInfo.score.length;i++){
        console.log(sectionInfo.score[i].value!="" || sectionInfo.max[i].value!="")
        if(sectionInfo.score[i].value!="" || sectionInfo.max[i].value!="")
          return false;
      }
      return true;
  }


  //Fungsi untuk menggenerate nilai asli
  function generateScoreObject(objArray){
    var count_score = 0, count_total=0;  
    
    for(var i=0;i<objArray.length;i++){
      if(objArray[i]['info']!=0){
        count_score = count_score+Number(objArray[i]['info']["benar"]);
        count_total = count_total+Number(objArray[i]['info']["total"]);
      }
    }

    var raw = {score : count_score, total : count_total}
    var objectResult = [raw, generateBonus(raw), generateBonusv2(raw), generateBonusv3(raw), generateBonusv4(raw), generateBonusv5(raw)];
    console.log(objectResult)
    return countScore(objectResult);
  }

  function countScore(data_array){
    var resultArray = []
    for(var i=0;i<data_array.length;i++){
      resultArray.push((data_array[i]['score']/data_array[i]['total'])*100);
    }
    return resultArray;
  }



  function getFactor(n){
    var helperFactor = [];
    n = parseInt(n);
    for(var i=1;i<=Math.sqrt(n);i++){
      if(n%i==0){
        if(n/i==i){
          helperFactor.push(i);
      }else{
          helperFactor.push(i);
          helperFactor.push(n/i);
      }
      }
    }
    return helperFactor;
  }

  function logarithm(num, base=10){
    return Math.log(num)/Math.log(base);
  }

  function isPrime(number){
    if(number<=1) return false;
    else {
      for(var i=2;i*i<=number;i++){
        if(number%i==0) return false;
      }
      return true;
    }
  }


  function generateBonus(raw){
    var multiplier = parseInt(raw['total']/5);
    var poss1 = multiplier*5;
    var poss2 = (multiplier+1)*5;
    var bonus = 0;
    //Bonus akan dijalankan jika total minimal 10
    if(parseInt(raw['total'])>=10){
      //Kalau lebih deket ke sebelumnya
      if(Math.abs(poss1-raw['total'])<Math.abs(poss2-raw['total'])){
        bonus = Number(poss1-raw['total']);
      }
      //Kalau lebih deket ke setelahnya
      else {
        bonus = Number(poss2-raw['total']);
      }

      
    }
  
    return {score : raw['score']+bonus, total : raw['total']+bonus};

  }

  //Fungsi untuk menggenerate nilai bonus tanpa pengurangan
  function generateBonusv2(raw){
      var multiplier = parseInt(raw['total']/5);
      var poss = (multiplier+1)*5;
      var bonus = 0;
      
      //Bonus akan dijalankan jika total minimal 10
      if(parseInt(raw['total'])%5!=0 && raw['total']>=10)
      //Bonus selalu adalah bilangan setelahnya
      bonus = Number(poss-raw['total']);
      else if(parseInt(raw['total'])==9){
        bonus = Number(10-raw['total'])
      }


      return {score : raw['score']+bonus, total : raw['total']+bonus};
  }

    //Melakukan bonus spesial
    function generateBonusv3(raw){
      var bonus = 0;
      //Menentukan faktor dan helper
      var exponent = Math.ceil(logarithm(raw['total']));
      var factor = Math.pow(10, exponent);
      console.log(factor);
      var helper = getFactor(factor);
      //Bonus akan dijalankan jika total minimal 10
      if(parseInt(raw['total'])>=10){
        
        //Kalau gak habis dibagi 5 atau lebih dari 40 tapi gak habis dibagi 10
        if(parseInt(raw['total'])%5!=0 || (raw['total']>40 && parseInt(raw['total'])%10!=0)){
          var puluhan = parseInt(raw['total']/10)*10;
          var kandidat = [{
                            angka : puluhan,  
                            factor : function(){return helper.includes(this.angka)}
                          }, 
                          {
                            angka : puluhan+5, 
                            factor : function() {return helper.includes(this.angka)}
                            }, 
                          {
                            angka : puluhan+10, 
                            factor : function() {return helper.includes(this.angka)}
                          }
                        ];
          var jarak = {
            faktor : [], bukan_faktor : []
          };
          //Memisahkan faktor dari 100
          for(var i=0;i<kandidat.length;i++){
              if(kandidat[i].factor()==true){
                  jarak['faktor'].push(kandidat[i].angka);
              }else{
                  jarak['bukan_faktor'].push(kandidat[i].angka);
              }
          }
          console.log(jarak);
          //Kalau ada faktornya
          if(jarak['faktor'].length!=0){
            var newScore = getMinimum(jarak['faktor'], raw['total']);
            
            if(nearestFactor(jarak['bukan_faktor'],25)!==false){
              var anotherScore = nearestFactor(jarak['bukan_faktor'],25);
              if(Math.abs(anotherScore-raw['total'])<Math.abs(newScore-raw['total']) && anotherScore-raw['total']>0){
                if(anotherScore-raw['total']>0) newScore = anotherScore;
              }
            } else if(nearestFactor(jarak['bukan_faktor'],20)!==false){
              var anotherScore = nearestFactor(jarak['bukan_faktor'],20);
              if(Math.abs(anotherScore-raw['total'])<Math.abs(newScore-raw['total']) && anotherScore-raw['total']>0){
                 newScore = anotherScore;
              }
            }
            bonus = newScore-raw['total'];
            console.log(newScore);
          //Kalau gaada yang merupakan faktor, prioritas pertama adalah jarak terdekat (kelipatan 25 terdekat atau 20 terdekat)
          //Prioritas pertama adalah kelipatan 25
          }else if(nearestFactor(jarak['bukan_faktor'], 25)!==false){
              var nearestFactorof25 = nearestFactor(jarak['bukan_faktor'],25)-raw['total'];
              var nearestFactorof20 = nearestFactor(jarak['bukan_faktor'],20)-raw['total'];
              console.log(nearestFactorof20+" "+nearestFactorof25);
              if(Math.abs(nearestFactorof25)>Math.abs(nearestFactorof20)){
                bonus = nearestFactorof20;
              }else{
                bonus = nearestFactorof25;
              }
          //Prioritas kedua adalah kelipatan 20 (pasti ada)
          }else {
              bonus = nearestFactor(jarak['bukan_faktor'],20)-raw['total'];
          }

      }
      //Cek apakah nilai bonus sudah memenuhi syarat
      var rawScore = parseInt(raw['total'])+bonus;
      //Kalau total skor lebih dari 120 dan habis dibagi 10 
      if(rawScore>=120 && rawScore%10==0){
          
          var determiner = rawScore/20;
          if(rawScore%20!=0||
            (rawScore%20==0 && isPrime(rawScore/20) && rawScore/20>=13)){
            var lower_factor=rawScore, upper_factor=rawScore;
            while(lower_factor%25!=0){
              lower_factor -= 5;
            }
            while(upper_factor%25!=0){
              upper_factor += 5;
            }
            if(rawScore-lower_factor<upper_factor-rawScore){
              bonus += (lower_factor-rawScore)
            }else{
              bonus += (upper_factor-rawScore)
            }
            //Kalau habis dibagi 20 tapi susah ngitungnya
          }/*else{

          }*/
      }
      
      }
      return {score : raw['score']+bonus, total : raw['total']+bonus};
  }



    //Untuk melakukan bonus untuk total skor yang tidak habis dibagi 10 (kecuali yang merupakan faktor)
    function generateBonusv4(raw){
      var bonus = 0;
      //Menentukan faktor dan helper
      var exponent = Math.ceil(logarithm(raw['total']));
      var factor = Math.pow(10, exponent);
      console.log(factor);
      var helper = getFactor(factor);
      //Untuk mendapatkan kelipatan 5 terdekat
      if(parseInt(raw['total'])>=10){
          var multiplier = parseInt(raw['total']/5);
          var poss1 = multiplier*5;
          var poss2 = (multiplier+1)*5;
          //Kalau lebih deket ke sebelumnya
          if(Math.abs(poss1-raw['total'])<Math.abs(poss2-raw['total'])){
            bonus = Number(poss1-raw['total']);
          }
          //Kalau lebih deket ke setelahnya
          else {
            bonus = Number(poss2-raw['total']);
          }
        var rawScore = parseInt(raw['total'])+bonus
        //Raw score dapat dijamin merupakan kelipatan 5
        //Kalau satuannya 5 dan bukan faktor dari 100
        if(rawScore%10==5 && !helper.includes(rawScore)){
          bonus+=5;
        }
      }
      return {score : raw['score']+bonus, total : raw['total']+bonus};
    }



    //Program mendapatkan kelipatan 5 terdekat dengan cara bonusing
    function generateBonusv5(raw){
      
      var bonus = 0;
      //Untuk mendapatkan kelipatan 5 terdekat
      if(parseInt(raw['total'])>=10){
        var multiplier = parseInt(raw['total']/5);
        var poss1 = multiplier*5;
        var poss2 = (multiplier+1)*5;
        //Kalau lebih deket ke sebelumnya
        if(Math.abs(poss1-raw['total'])<Math.abs(poss2-raw['total'])){
          bonus = Number(poss1-raw['total']);
        }
        //Kalau lebih deket ke setelahnya
        else {
          bonus = Number(poss2-raw['total']);
        }
      }
      if(bonus<0){
        return {score : Math.min(raw['score'], raw['total']+bonus), total : raw['total']+bonus}; 
      }else{
        return {score : raw['score']+bonus, total : raw['total']+bonus}; 
      }
    }


    function getMinimum(arr, number){
      var min = Math.abs(arr[0]-number), min_number = arr[0];
      for(var i=1;i<arr.length;i++){
          if(Math.abs(arr[i]-number)<min) {min=Math.abs(arr[i]-number);min_number=arr[i]}
      }
      return min_number;
    }

    function nearestFactor(arr, number){
        for(var i=0;i<arr.length;i++){
          if(arr[i]%number==0) return arr[i];
        }
        return false;
    }

  function countScoreSection(obj){
    var raw = {
      score : obj['benar'], total : obj['total']
    };
    var objectResult=[raw, generateBonus(raw), 
                      generateBonusv2(raw), generateBonusv3(raw), 
                      generateBonusv4(raw),generateBonusv5(raw)];
    console.log(objectResult)
    return countScore(objectResult);
  }

  function count(){
    //Mengolah jumlah nilai

    var info = [
      {tipe: "pilgan", info : getFixedScoreInfo("pilgan"), status : "fixed"},
      {tipe: "isian", info : getFixedScoreInfo("isian"), status : "fixed"}, 
      {tipe: "uraian",info : getScoreInfo("uraian"), status : "relative"}, 
      {tipe: "bacaan", info : getScoreInfo("bacaan"), status : "relative"},
      {tipe:"cocok", info:getFixedScoreInfo("cocok"), status:"fixed"},
      {tipe:"bs", info:getFixedScoreInfo("bs"), status:"fixed"},
      {tipe:"tts", info:getFixedScoreInfo("tts"), status:"fixed"}
    ];

    console.log(info);
    console.log(AllTrue(info));

    if (AllTrue(info)){
      var nilai;
      if(!average.checked){
          nilai = generateScoreObject(info);
      } else {
          var count_element = 0;
          nilai=[0,0,0,0,0,0]
          //Mengassign nilai per elemen
          for(var i=0;i<info.length;i++){
              if(info[i]['info']!==0){
                for(var j=0;j<nilai.length;j++){
                  nilai[j] += countScoreSection(info[i]['info'])[j];
                }
                count_element++;
              }
          }

          //Mencari rata-rata
          for(var i=0;i<nilai.length;i++){
            nilai[i] = nilai[i]/count_element
          }
      }
        document.getElementById("ket_total").hidden = false;

        for(var i=0;i<info.length;i++){
          if(check_hidden(info[i]["tipe"])==false){
            if(info[i]["status"]=="fixed")
              getFixedInfo(info[i]["tipe"]);
            else
              getInfo(info[i]["tipe"]);
            }else{
              closeInfo(info[i]["tipe"]);
          }
        }

        addElement("nilai_utama", "<b>"+Math.round(nilai[0])+"</b>");
        var bonus_class = document.getElementsByClassName('bonus');
        for(var i=0;i<bonus_class.length;i++){
          bonus_class[i].innerHTML=Math.round(nilai[i+1]);
        }
        var round_class = {floor : document.getElementsByClassName('floor'),
        ceiling : document.getElementsByClassName('ceiling'),
        onepoint : document.getElementsByClassName('onepoint')}
        for(var i=0;i<round_class['floor'].length;i++){
          round_class['floor'][i].innerHTML=Math.floor(nilai[i]);
          round_class['ceiling'][i].innerHTML=Math.ceil(nilai[i]);
          round_class['onepoint'][i].innerHTML=nilai[i].toFixed(1);
        }


        addElement("twopoint", nilai[0].toFixed(2));
        addElement("threepoint", nilai[0].toFixed(3));
        openHidden("ket_nilai");
    }
  }





  function addElement(id, value){
      document.getElementById(id).innerHTML = value;
  }

  function addElementByClass(id, value){
    document.getElementById(id).innerHTML = value;
}

  function useHelper(name, id){
    var modified_id = id.replace("helper_"+name+"_", "");


    $('#helper_div_'+name+"_"+modified_id).slideToggle(function(){
      var mainsent = "Helper Pecahan"
      if($(this).is(":visible")){
        $('#helper_'+name+"_"+modified_id).text("Hapus "+mainsent);
      }else{
        $('#helper_'+name+"_"+modified_id).text("Gunakan "+mainsent);
      }
    });
  }



  function generate_text(name, id) {
      var form = 
      `<div class="${name}_${id}">
      <div class="form-row my-2">
        <div class="col">
          <b>Nomor ${id} </b>
        </div>
      </div>
      <div class="form-row ${name}_${id}">
        <div class="col-sm-3">
          <label for="skor_${name}_${id}">Skor yang diperoleh</label>
          <input type="number" id="skor_${name}_${id}"class="benar_${name} form-control" 
          value="" step="0.5" min="0">
        </div>
        <div class="col-sm-3">
          <label for="benar_${name}_${id}">Bobot</label>
          <input type="number" id="benar_${name}_${id}"class="skor_${name} form-control" 
          value="" step="1" min="1">
        </div>
      </div>
      <button class="btn btn-light" id = "helper_${name}_${id}" name="${name}"
      onClick="useHelper(this.name, this.id)">Gunakan Helper Pecahan
      </button>
      </div>`
      var helper = `<div class="helper_${name} ${name}_${id}" id="helper_div_${name}_${id}"
      style="display:none">
      <div class="form-inline">
        <div class="form-group">
        <label for="pembilang_${id}" class="label-helper">Pembilang :</label>
        <input type="number" id="pembilang_${id}" class= "pembilang_${name} form-control input-sm" 
        value="" step="1">
        </div>
        <div class="form-group">
        <label for="penyebut_${id}" style="font-size:10pt" class="label-helper">Penyebut :</label>
        <input type="number" id="penyebut_${id}" class= "penyebut_${name} form-control input-sm" value="" step="1">
        </div>
        </div>
      </div>`

      return {form : form, helper : helper};
  }

  var type_of_relative = ["bacaan", "uraian"]
  var pointer = {};

  $(document).ready(function(){
      
      for(var i=0;i<type_of_relative.length;i++){
        pointer[type_of_relative[i]]=1;
        var generator = generate_text(type_of_relative[i], pointer[type_of_relative[i]]);
        $('#score_'+type_of_relative[i]).append(generator.form).append(generator.helper);
        generate(type_of_relative[i], pointer[type_of_relative[i]]);
      }
  })

  function generate(name, pointer){
    $("#add_"+name).click(function(){
        pointer++;
        var generator = generate_text(name, pointer);
        $('#score_'+name).append(generator.form).append(generator.helper);
        checkPointer(pointer, name);
    })

    $("#sub_"+name).click(function(){
        $(`.${name}_${pointer}`).remove();
        pointer--;
        checkPointer(pointer, name);
    })
  }


  function checkPointer(pointer, name){
    
      if(pointer>1){
        console.log("Yok bisa yok :"+pointer)
        $('#sub_'+name).show();
      }
      if(pointer<=1){
        $('#sub_'+name).hide();
      }
  }






  /*function generate_score(name, id){
    var target = ("score_"+name);
    var number_of_element = $("#"+id).val();
    //inner_target.innerHTML="";
    for(var i=0;i<number_of_element;i++){
      var form_text = generate_text(name, i+1).form;
      var helper_text = generate_text(name, i+1).helper;
      inner_target.innerHTML = inner_target.innerHTML+form_text+helper_text;
    }
  }*/
