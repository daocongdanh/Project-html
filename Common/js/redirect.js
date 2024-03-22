$(document).ready(function () {

  // Lấy id product đang focus đẩy lên localStorage và chuyển đến trang productDetail
  $(document).on("click",".redirect",function(){
    var id = $(this).attr("data-id");
    localStorage.setItem("idProduct",id);
  })
});