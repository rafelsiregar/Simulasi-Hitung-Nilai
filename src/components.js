var text_sekolah = 
    `<div class="form-inline">
        <label> Nama Sekolah : </label>
        <input type="text" name="school" value="" class="form-control ml-sm-2">
    </div>
    <div class="d-flex mt-2">
        <p class="font-weight-bold">Nilai rata-rata UN</p>
    </div>`

    var report_text =
    `<div id="report" style="display:none">
        <p class="font-weight-bold" id="result"></p>
        <p>Rata-rata UN <output id="sekolah1"></output> : <output id="avg1" class="avg"></output></p>
        <p>Rata-rata UN <output id="sekolah2"></output> : <output id="avg2" class="avg"></output></p>
        <p>Selisih : <output id="selisih"></output></p>
    </div>
    `
    
    var button = `<div class="ml-sm-2 d-flex justify-content-center">
                    <button type="button" class="btn btn-custom-add mb-5 mt-4" onclick="compare()">Bandingkan</button>
                    </div>`

var elements =
    `<h1 class="ml-3 mt-2 text-center font-weight-bold" id="title"></h1>
    <div class="main-process">
        <div id="info-jurusan" class="radio-info"></div>
        <div class="row ml-1 mt-5" id="main-row">
            <div class="col-md-8">
                <div class="row">
                        <div class="col-md-6 justify-content-center">
                            <div class="info-sekolah"></div>
                            <!--Informasi Nilai-->
                            <div class="info-jenjang"></div>
                        </div>
                        <div class="col-md-6 justify-content-center">
                            <!--Informasi Sekolah-->
                            <div class="info-sekolah"></div>
                            <!--Informasi Nilai-->
                            <div class="info-jenjang"></div>
                        </div>
                    </div>
                    <div id="main_button"></div>
                </div>
            <div class="col-md-4" id="report_info"></div>
        </div>
        
        
    </div>`


function render(title){
    var text = {
        'SD' : `<div class="form-group">
        <label>Bahasa Indonesia : </label> 
        <input type="number" name="bind" value="" step="0.01" min="0" max="100" class="form-control">
        <label>Matematika : </label>
        <input type="number" name="mat" value="" step="0.01" min="0" max="100" class="form-control">
        <label>IPA : </label>
        <input type="number" name="ipa" value="" step="0.01" min="0" max="100" class="form-control">
        </div>`,
        'SMP' : `<div class="form-group">
        <label>Bahasa Indonesia : </label> 
        <input type="number" name="bind" value="" step="0.01" min="0" max="100" class="form-control">
        <label>Bahasa Inggris : </label>
        <input type="number" name="bing" value="" step="0.01" min="0" max="100" class="form-control">
        <label>Matematika : </label>
        <input type="number" name="mat" value="" step="0.01" min="0" max="100" class="form-control">
        <label>IPA : </label>
        <input type="number" name="ipa" value="" step="0.01" min="0" max="100" class="form-control">
        </div>`,
        'SMA' : `<div class="form-group">
        <label>Bahasa Indonesia : </label> 
        <input type="number" name="bind" value="" step="0.01" min="0" max="100" class="form-control">
        <label>Bahasa Inggris : </label>
        <input type="number" name="bing" value="" step="0.01" min="0" max="100" class="form-control">
        <label>Matematika : </label>
        <input type="number" name="mat" value="" step="0.01" min="0" max="100" class="form-control">
        <label class='pil1'>Pilihan 1 : </label>
        <input type="number" name="pil1" value="" step="0.01" min="0" max="100" class="form-control">
        <label class='pil2'>Pilihan 2 : </label>
        <input type="number" name="pil2" value="" step="0.01" min="0" max="100" class="form-control">
        <label class='pil3'>Pilihan 3 : </label>
        <input type="number" name="pil3" value="" step="0.01" min="0" max="100" class="form-control">
        </div>`
    }
    
    
    $('.main-element').html(elements);

    $('#title').text('Bandingkan nilai UN '+title);

    if(title==='SMA'){
        var text_jurusan = 
        `<div class="d-flex justify-content-center">
        <p>Jurusan : </p>
        <div class="custom-control custom-radio ml-2">
          <input type="radio" id="ipa" name="jurusan" value="ipa" class="custom-control-input" 
          onclick="set_jurusan(this.value)">
          <label class="custom-control-label ml-2" for="ipa">IPA</label>
        </div>
        <div class="custom-control custom-radio">
          <input type="radio" id="ips" name="jurusan" value="ips" class="custom-control-input"
          onclick="set_jurusan(this.value)">
          <label class="custom-control-label ml-2" for="ips">IPS</label>
        </div>
        </div>`

        console.log($('#info-jurusan').html(text_jurusan))

        $('#info-jurusan').html(text_jurusan);
    }else{
        $('.main-process').remove('#info-jurusan');
    }
    
    for(var i=0;i<$('.info-sekolah').length;i++){
        $('.info-sekolah').eq(i).html(text_sekolah);
    }
    for(var i=0;i<$('.info-jenjang').length;i++){
        
       $('.info-jenjang').eq(i).html(text[title]);
    }

    $('#report_info').html(report_text);
    $('#main_button').html(button);
    
}

function setText(text){
    $('#result').text(text);
}



    










