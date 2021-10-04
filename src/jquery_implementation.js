var back =     ` <!--Navbar-->
<button class=" btn btn-custom-light back-to-main" id="back" onclick="window.location.href='fitur.html'">
  Kembali ke menu utama
</button>
<!--End Navbar-->`

$(function(){
    $("#header").html(back);
});

$(document).ready(function(){
    $("#show_bonus").click(function(){
      $("#bonus_result").slideToggle();
    });
  });

$(document).ready(function(){
    $("#show_round").click(function(){
      $("#pembulatan").slideToggle();
    });
  });

  $(document).ready(function(){
    $("#show_one_round").click(function(){
      $("#pembulatan_satu").slideToggle();
    });
  });

  $(document).ready(function(){
    $("#show_v3_round").click(function(){
      $("#pembulatan_v3").slideToggle();
    });
  });

  $(document).ready(function(){
    $("#show_more_round").click(function(){
      $("#pembulatan_lain").slideToggle();
    });
  });

  $(document).ready(function(){
    $("#show_satuan").click(function(){
      $("#satuan").slideToggle();
    });
  });

  $(document).ready(function(){
    $("#show_grade").click(function(){
      $("#grade").slideToggle();
    });
  });



