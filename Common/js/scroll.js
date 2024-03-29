$(document).ready(function () {
  $("#scrollUp").click(function(){
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  })
  $(window).scroll(function(){
    console.log($(this).scrollTop())
    if($(this).scrollTop() > 0){
      $("#scrollUp").css("display","block");
    }
    else{
      $("#scrollUp").css("display","none");
    }
  })
});