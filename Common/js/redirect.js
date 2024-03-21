$(document).ready(function () {
  $(document).on("click",".redirect",function(){
    var id = $(this).attr("data-id");
    localStorage.setItem("idProduct",id);
  })
});