  //Mengolah Alert
  function errorAlert(){
    alert("Mohon maaf, ada kesalahan dalam input data");
  }

  function unfilledAlert(){
    alert("Mohon maaf, data harus diisi");
  }

  var base_pop_up = `<!--Membuat pop up-->
  <div class="modal fade" id="modal-pop-up" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
      
        <div class="d-flex justify-content-end">
          <!--Tombol Kembali-->
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <img src="assets/img/Close.svg" alt="Close" class="close"/>
          </button>
        </div>
        <h5 class="judul_petunjuk text-center" id="modal-title"><!--Judul Pop Up--></h5>
        <div class="modal-body">
          <!--Isi Petunjuk di sini-->
        </div>
      </div>
    </div>
  </div>
  <!--End Pop Up-->`

